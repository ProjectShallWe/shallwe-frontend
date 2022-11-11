import {axiosAuth} from "@/axios";

export default {
    namespaced: true,
    state: {
        isNowPassword: false,
    },
    mutations: {
        setIsNowPassword(state, payload) {
            state.isNowPassword = payload;
        }
    },
    actions: {
        async checkNowPassword({commit}, {nowPassword}) {
            await axiosAuth.post(
                `api/user/check/password`, {
                    nowPassword
                }
            ).then((res) => {
                commit("setIsNowPassword", res.data)
            })
        },
        async changePassword({commit}, {nowPassword, newPassword}) {
            await axiosAuth.put(
                `api/user/password`, {
                    nowPassword,
                    newPassword
                },
            ).then((res) => {
                if (res.data === -1) {
                    return alert("현재 비밀번호를 다시 확인해주세요.")
                } else {
                    return alert("비밀번호를 변경했습니다.")
                }
            }).then(() => {
                window.location.reload();
            })
        },
    },
}