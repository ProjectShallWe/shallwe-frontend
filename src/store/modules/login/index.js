import axios from "@/axios";
import jwt_decode from "jwt-decode";

export default {
    namespaced: true,
    state: {
       token: '',
       nickname: '',
       email: '',
    },
    mutations: {
        setUser(state, payload) {
            state.token = payload;
            state.nickname = jwt_decode(payload).nickname;
            state.email = jwt_decode(payload).email;
            localStorage.setItem('userToken', payload);
            axios.defaults.headers.common['Authorization'] = `Bearer ${payload}`;
        },
        logout(state) {
            state.token = '';
            state.nickname = '';
            state.email = '';
            localStorage.removeItem("userToken");
            axios.defaults.headers.common['Authorization'] = '';
        },
        changeNickname(state, {nickname}) {
            state.nickname = nickname;
        }
    },
    actions: {
        login({commit}, payload) {
            axios.post(
                `/login`, payload
            ).then((res) => {
                commit("setUser", res.headers.authorization);
                alert("로그인에 성공했습니다.");
            }).catch(() => {
                alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요");
            })
        },
        logout({commit}) {
            commit("logout");
            alert("로그아웃되었습니다.")
        },
        changeNickname({commit}, {nickname}) {
            commit("changeNickname", {nickname})
        },
    },
    getters: {
        loggedIn(state) {
            return !!state.token;
        },
    }
}