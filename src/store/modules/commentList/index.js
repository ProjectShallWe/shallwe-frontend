import axios from "@/axios";

export default {
    namespaced: true,
    state: {
        comments: []
    },
    mutations: {
        setComments(state, payload) {
            state.comments = payload
        }
    },
    actions: {
        async getCommentsInPost({commit}, {postId}) {
            const res = await axios.get(
                `api/comment?post=${postId}`
            );
            commit('setComments', res.data)
        },

        async writeParentComment({commit}, {postId, content}) {

            await axios.post(
                `api/comment?post=${postId}`,
                {
                    content: content,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem('userToken'),
                    }
                }
            )
        },

        async writeChildComment({commit}, {postId, commentId, content}) {

            await axios.post(
                `api/comment/${commentId}?post=${postId}`,
                {
                    content: content,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem('userToken'),
                    }
                }
            )
        },

        async addLikeCount({commit}, {commentId}) {

            await axios.post(
                `api/like-comment?comment=${commentId}`,
                {},
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