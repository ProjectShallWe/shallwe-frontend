import axios from "@/axios";

export default {
    namespaced: true,
    state: {
        duplicateCheck: false,
    },
    mutations: {
        setDuplicateCheck(state, payload) {
            state.duplicateCheck = payload;
        }
    },
    actions: {
        async checkNicknameDuplicate({commit}, {nickname}) {
            await axios.post(
                `api/user/check`, {
                    nickname
                }
            ).then((res) => {
                commit("setDuplicateCheck", res.data)
            })
        },
        async changeNickname({commit}, {nickname}) {
            await axios.put(
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