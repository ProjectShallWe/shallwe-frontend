import {axiosAuth, axiosBasic} from "@/axios";

export default {
    namespaced: true,
    state: {
        nicknameDuplicateCheck: true,
    },
    mutations: {
        setNicknameDuplicateCheck(state, payload) {
            state.nicknameDuplicateCheck = payload;
        }
    },
    actions: {
        async checkNicknameDuplicate({commit}, {nickname}) {
            await axiosBasic.post(
                `api/user/check/nickname`, {
                    nickname
                }
            ).then((res) => {
                commit("setNicknameDuplicateCheck", res.data)
            })
        },
        async changeNickname({commit}, {nickname}) {
            await axiosAuth.put(
                `api/user/nickname`, {
                    nickname
                },
            ).then(() => {
                return alert("닉네임을 변경했습니다.")
            }).then(() => {
                window.location.reload();
            })
        },
    },
}