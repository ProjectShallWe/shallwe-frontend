import axios from "axios";
import {useCookies} from "vue3-cookies";
import store from "@/store";
import router from "@/router";

const {cookies} = useCookies();

let isAlreadyFetchingAccessToken = false;
let works = [];

const isExpired = (token) => {
    return cookies.get(token) === null;
}

const logOut = async () => {
    await store.commit("login/logout");

    alert("토큰이 만료되어 로그아웃됩니다.");

    await router.push({name: 'login'});
}

const reissueToken = async () => {
    const {data} = await axios.post(
        `${process.env.VUE_APP_API_URL}api/auth/reissue`,
        {
            refreshToken: cookies.get('refreshToken'),
        },
    );

    return data;
}

const setCookies = async (data) => {
    await cookies.set('accessToken', data.grantType + data.accessToken, new Date(data.accessTokenExpiresIn).toString());
    await cookies.set('refreshToken', data.grantType + data.refreshToken, new Date(data.refreshTokenExpiresIn).toString());
}

const commonAxiosHeaderConfig = (config) => {
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers['Access-Control-Allow-Origin'] = process.env.VUE_APP_API_URL;
    config.headers['Access-Control-Allow-Credentials'] = true;
}

/** axiosBasic */
const axiosBasic = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
})

axiosBasic.interceptors.request.use(
    async function (config) {

        commonAxiosHeaderConfig(config);

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

        if (isExpired("refreshToken")) {
            await logOut();
        }

        if (isExpired("accessToken")) {
            const data = await reissueToken();
            await setCookies(data);
        }

        commonAxiosHeaderConfig(config);
        config.headers["Authorization"] = cookies.get("accessToken");

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
    if (error.response.data.errorCode === "JWT_REFRESH_TOKEN_EXPIRED") {
        await logOut();
        return Promise.reject(error);
    }

    if (error.response.data.errorCode === "JWT_ACCESS_TOKEN_EXPIRED") {

        const retryOriginalRequest = new Promise((resolve) => {
            works.push(async (accessToken) => {
                error.config.headers.Authorization = "Bearer " + accessToken;
                resolve(axiosAuth(error.config));
            });
        });

        if (!isAlreadyFetchingAccessToken) {
            isAlreadyFetchingAccessToken = true;

            const data = await reissueToken();

            if (data.errorCode === "JWT_REFRESH_TOKEN_EXPIRED") {
                await logOut();
                return Promise.reject(error);
            }

            await setCookies(data);

            axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

            isAlreadyFetchingAccessToken = false;

            works.forEach((callback) => callback(data.accessToken));
            works = [];
        }
        return retryOriginalRequest;
    }
    return Promise.reject(error);
}

export {axiosBasic, axiosAuth}
