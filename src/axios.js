import axios from "axios";
import {useCookies} from "vue3-cookies";
import store from "@/store";

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
    baseURL: 'http://localhost:8080/',
})

axiosBasic.interceptors.request.use(
    function (config) {
        config.headers["Content-Type"] = "application/json; charset=utf-8";
        config.headers['Access-Control-Allow-Origin'] = '*';

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
    baseURL: 'http://localhost:8080/',
})

axiosAuth.interceptors.request.use(
    function (config) {

        config.headers["Content-Type"] = "application/json; charset=utf-8";
        config.headers["Authorization"] = cookies.get("accessToken");
        config.headers['Access-Control-Allow-Origin'] = '*';

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
                `http://localhost:8080/api/auth/reissue`,
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
