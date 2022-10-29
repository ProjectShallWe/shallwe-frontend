import axios from "axios";
import {useCookies} from "vue3-cookies";

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
})

instance.interceptors.request.use(
    function (config) {
        const {cookies} = useCookies();

        config.headers["Content-Type"] = "application/json; charset=utf-8";
        config.headers["Authorization"] = cookies.get("accessToken");

        return config
    },
    function (error) {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    function (res) {
        return res;
    },
    function (error) {
        return Promise.reject(error)
    }
)

export default instance;