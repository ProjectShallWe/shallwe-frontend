import axios from "@/axios";

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
        async getPostDetails ({commit}, {postId}) {

            const res = await axios.get(
                `api/post/${postId}`
            )

            commit("setPostDetails", res.data)
        },

        async addLikeCount({commit}, {postId}) {

            await axios.post(
                `api/like-post?post=${postId}`,
                {},
                {
                    headers: {
                        Authorization: localStorage.getItem('userToken'),
                    }
                }
            ).then((res) => {
                if (res.data === -1) {
                    return alert("이미 공감하신 글입니다.");
                }
            });
        },
    },
}