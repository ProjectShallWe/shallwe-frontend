import {axiosAuth, axiosBasic} from "@/axios";
import router from "@/router";

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
        async deletePost({commit}, {postId, boardId}) {

            await axiosAuth.delete(
                `api/post/${postId}`,
                {}
            ).then((res) => {
                if (res.data === Number(postId)) {
                    alert("글 삭제가 완료되었습니다.")
                    return router.push(`/community/${boardId}`)
                }
            }).catch(() => {
                alert("글 삭제에 실패했습니다.")
            })

        }
    },
}