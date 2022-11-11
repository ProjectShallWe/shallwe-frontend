import {axiosBasic} from "@/axios";
import router from "@/router";

export default {
    namespaced: true,
    state: {
        userId: 0,
        emailDuplicateCheck: false,
    },
    mutations: {
        setUserId(state, payload) {
            state.userId = payload;
        },
        setEmailDuplicateCheck(state, payload) {
            state.emailDuplicateCheck = payload;
        }
    },
    actions: {
        async checkEmailDuplicate({commit}, {email}) {
            await axiosBasic.post(
                `/api/user/check/email`, {
                    email
                }
            ).then((res) => {
                commit("setEmailDuplicateCheck", res.data)
            })
        },
        async signUp({commit}, {email, password, nickname}) {
            await axiosBasic.post(
                `/api/user`, {
                    email,
                    password,
                    nickname
                }
            ).then((res) => {
                commit("setUserId", res.data)
                alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.")
                router.push({name: 'login'})
            }).catch(() => {
                alert("회원가입에 실패했습니다. 정보를 다시 입력해주세요?")
            })
        }
    },
}