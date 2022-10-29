import axios from "@/axios";
import jwt_decode from "jwt-decode";
import {useCookies} from "vue3-cookies";

export default {
    namespaced: true,
    state: {
       nickname: '',
       email: '',
    },
    mutations: {
        setUser(state, {grantType, accessToken, refreshToken, accessTokenExpiresIn, refreshTokenExpiresIn}) {
            const { cookies } = useCookies();

            state.nickname = jwt_decode(accessToken).nickname;
            state.email = jwt_decode(accessToken).email;
            cookies.set('accessToken', grantType + accessToken, new Date(accessTokenExpiresIn).toString());
            cookies.set('refreshToken', grantType + refreshToken, new Date(refreshTokenExpiresIn).toString());
        },
        logout(state) {
            const { cookies } = useCookies();

            state.nickname = '';
            state.email = '';
            cookies.remove("accessToken");
            cookies.remove("refreshToken");
        },
        changeNickname(state, {nickname}) {
            state.nickname = nickname;
        }
    },
    actions: {
        login({commit}, {email, password}) {
            axios.post(
                `/login`, {
                    email,
                    password,
                }
            ).then((res) => {
                commit("setUser", {
                    grantType: res.data.grantType,
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                    accessTokenExpiresIn: res.data.accessTokenExpiresIn,
                    refreshTokenExpiresIn: res.data.refreshTokenExpiresIn,
                });
                alert("로그인에 성공했습니다.");
            }).catch(() => {
                alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요");
            })
        },
        logout({commit}) {
            axios.post(
                `/api/auth/logout`, {
                    refreshToken: useCookies().cookies.get('refreshToken'),
                }
            )
            commit("logout");
            alert("로그아웃되었습니다.")
        },
        changeNickname({commit}, {nickname}) {
            commit("changeNickname", {nickname})
        },
    },
    getters: {
        loggedIn(state) {
            return !!state.nickname;
        },
    }
}