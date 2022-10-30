import {axiosAuth, axiosBasic} from "@/axios";
import router from "@/router";

export default {
    namespaced: true,
    state: {
        board: [],
        imageUrl: '',
    },
    mutations: {
        setBoard(state, payload) {
            state.board = payload;
        },
        setImageUrl(state, payload) {
            state.imageUrl = payload;
        }
    },
    actions: {
        async getBoardWithPostCategories({commit}, {id}) {

            const res = await axiosBasic.get(
                `api/board/${id}`
            );
            commit('setBoard', res.data);
        },

        async uploadPostImage({commit}, {file}) {
            let data = new FormData();
            data.append('file', file);

            const res = await axiosAuth.post(
                `api/file/upload`,
                data,
                {
                    headers: {
                        'content-type': 'multipart/form-data',
                    }
                }
            )
            await commit('setImageUrl', res.data);
        },

        async writePost({commit}, {boardId, categoryId, title, content}) {
            await axiosAuth.post(
                `api/post?category=${categoryId}`,
                {
                        title,
                        content,
                },
            ).then(() => {
                alert("작성하신 글이 정상 등록되었습니다.")
                router.push(`/community/${boardId}?category=${categoryId}`)
            }).catch(() => {
                alert("글 등록에 실패했습니다.")
            })
        }
    }
}