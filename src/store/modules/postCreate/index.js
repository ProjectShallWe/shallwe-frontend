import axios from "@/axios";
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
        async getBoardWithPostCategories({commit}, payload) {

            const res = await axios.get(
                `api/board/${payload.id}`
            );
            commit('setBoard', res.data);
        },

        async uploadPostImage({commit}, {file}) {
            let data = new FormData();
            data.append('file', file);

            const res = await axios.post(
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

        async writePost({commit}, payload) {
            await axios.post(
                `api/post?category=${payload.categoryId}`,
                {
                        title: payload.title,
                        content: payload.content,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem('userToken'),
                    }
                }
            ).then(() => {
                alert("작성하신 글이 정상 등록되었습니다.")
                router.push(`/community/${payload.boardId}?category=${payload.categoryId}`)
            }).catch(() => {
                alert("글 등록에 실패했습니다.")
            })
        }
    }
}