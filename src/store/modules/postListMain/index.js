import axios from "@/axios";

export default {
    namespaced: true,
    state: {
        board: [],
        posts: [],
        page: 0,
        totalPages: 0,
    },
    mutations: {
        setBoard(state, payload) {
            state.board = payload;
        },
        setPosts(state, {content, number, totalPages}) {
            state.posts = content;
            state.page = number;
            state.totalPages = totalPages
        }
    },
    actions: {
        async getBoardWithPostCategories({commit}, payload) {

            const res = await axios.get(
                `api/board/${payload.id}`
            );
            commit('setBoard', res.data);
        },
        async getPostsInBoard({commit}, {boardId, page}) {

            const res = await axios.get(
                `api/post/all?board=${boardId}&page=${page}`
            );
            commit('setPosts', {
                content: res.data.content,
                number: res.data.number,
                totalPages: res.data.totalPages
            });
        },
        async getPostsInPostCategory({commit}, {categoryId, page}) {

            const res = await axios.get(
                `api/post?category=${categoryId}&page=${page}`
            );
            commit('setPosts', {
                content: res.data.content,
                number: res.data.number,
                totalPages: res.data.totalPages
            });
        },
    },
}