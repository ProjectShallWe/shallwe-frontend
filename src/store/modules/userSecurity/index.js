import axios from "@/axios";

export default {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        changePassword({commit}, {nowPassword, newPassword}) {
            axios.put(
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