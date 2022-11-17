import axios from "axios";
import {useCookies} from "vue3-cookies";
import store from "@/store";
import router from "@/router";

const {cookies} = useCookies();

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

const onAccessTokenFetched = (accessToken) => {
    subscribers.forEach((callback) => callback(accessToken));
    subscribers = [];
};

const addSubscriber = (callback) => {
    subscribers.push(callback);
}

/** axiosBasic */
const axiosBasic = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
})

axiosBasic.interceptors.request.use(
    function (config) {
        config.headers["Content-Type"] = "application/json; charset=utf-8";
        config.headers['Access-Control-Allow-Origin'] = process.env.VUE_APP_API_URL;
        config.headers['Access-Control-Allow-Credentials'] = true;

        return config
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosBasic.interceptors.response.use(
    function (res) {
        return res;
    },
    function (error) {
        return setTokenHandling(error);
    }
)

/** axiosAuth */
const axiosAuth = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
})

axiosAuth.interceptors.request.use(
    async function (config) {

        if (cookies.get("refreshToken") === null) {
            await store.commit("login/logout");
            alert("토큰이 만료되어 로그아웃됩니다.");
            await router.push({name: 'login'});
            return;
        }

        if (cookies.get("accessToken") === null) {

            const {data} = await axios.post(
                `${process.env.VUE_APP_API_URL}api/auth/reissue`,
                {
                    refreshToken: cookies.get('refreshToken'),
                },
            );

            await cookies.set('accessToken', data.grantType + data.accessToken, new Date(data.accessTokenExpiresIn).toString());
            await cookies.set('refreshToken', data.grantType + data.refreshToken, new Date(data.refreshTokenExpiresIn).toString());
        }

        config.headers["Content-Type"] = "application/json; charset=utf-8";
        config.headers["Authorization"] = cookies.get("accessToken");
        config.headers['Access-Control-Allow-Origin'] = process.env.VUE_APP_API_URL;
        config.headers['Access-Control-Allow-Credentials'] = true;

        return config
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosAuth.interceptors.response.use(
    function (res) {
        return res;
    },
     function (error) {
         return setTokenHandling(error);
     }
)

const setTokenHandling = async (error) => {
    if (error.response.data.errorCode === "JWT_ACCESS_TOKEN_EXPIRED") {

        const retryOriginalRequest = new Promise((resolve) => {
            addSubscriber(async (accessToken) => {
                error.config.headers.Authorization = "Bearer " + accessToken;
                resolve(axiosAuth(error.config));
            });
        });

        if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;

            const {data} = await axios.post(
                `${process.env.VUE_APP_API_URL}api/auth/reissue`,
                {
                    refreshToken: cookies.get('refreshToken'),
                },
            );

            if (data.errorCode === "JWT_REFRESH_TOKEN_EXPIRED") {
                await store.dispatch("login/logout");
                window.location.reload();
                return Promise.reject(error);
            }

            await cookies.set('accessToken', data.grantType + data.accessToken, new Date(data.accessTokenExpiresIn).toString());
            await cookies.set('refreshToken', data.grantType + data.refreshToken, new Date(data.refreshTokenExpiresIn).toString());

            axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

            window.location.reload();

            onAccessTokenFetched(data.accessToken);
        }

        return retryOriginalRequest;
    }

    if (error.response.data.errorCode === "JWT_REFRESH_TOKEN_EXPIRED") {
        await store.dispatch("login/logout");
        return Promise.reject(error);
    }

    return Promise.reject(error);
}

export {axiosBasic, axiosAuth}
