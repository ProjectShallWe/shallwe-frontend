import axios from "@/axios";

export default {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        async addLikeCount({commit}, payload) {

            await axios.post(
                `api/like-comment?comment=${payload.commentId}`,
                {

                },
                {
                    headers: {
                        Authorization: localStorage.getItem('userToken'),
                    }
                }
            ).then((res) => {
                if (res.data === -1) {
                    return alert("이미 공감하신 댓글입니다.");
                }
            });
        }
    },
}