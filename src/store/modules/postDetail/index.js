import axios from "@/axios";

export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
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
        }
    },
}