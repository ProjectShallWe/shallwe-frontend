import {axiosAuth, axiosBasic} from "@/axios";

export default {
    namespaced: true,
    state: {
        postDetail: [],
    },
    mutations: {
        setPostDetails(state, payload) {
            state.postDetail = payload;
        }
    },
    actions: {
        async getPostDetails ({commit}, {id}) {

            const res = await axiosBasic.get(
                `api/post/${id}`
            )

            commit("setPostDetails", res.data)
        },

        async addLikeCount({commit}, {id}) {

            await axiosAuth.post(
                `api/like-post?post=${id}`,
                {},
            ).then((res) => {
                if (res.data === -1) {
                    return alert("이미 공감하신 글입니다.");
                }
            });
        },
    },
}