import {axiosAuth, axiosBasic} from "@/axios";

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
        async getCommentsInPost({commit}, {id}) {
            const res = await axiosBasic.get(
                `api/comment?post=${id}`
            );
            commit('setComments', res.data)
        },

        async writeParentComment({commit}, {id, content}) {

            await axiosAuth.post(
                `api/comment?post=${id}`,
                {
                    content,
                },
            )
        },

        async writeChildComment({commit}, {postId, commentId, content}) {

            await axiosAuth.post(
                `api/comment/${commentId}?post=${postId}`,
                {
                    content: content,
                },
            )
        },

        async addLikeCount({commit}, {commentId}) {

            await axiosAuth.post(
                `api/like-comment?comment=${commentId}`,
                {},
            ).then((res) => {
                if (res.data === -1) {
                    return alert("이미 공감하신 댓글입니다.");
                }
            });
        }
    },
}