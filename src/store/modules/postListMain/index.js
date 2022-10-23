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
        async getBoardWithPostCategories({commit}, {id}) {

            const res = await axios.get(
                `api/board/${id}`
            );
            commit('setBoard', res.data);
        },
        async getPostsInBoard({commit}, {id, page}) {

            const res = await axios.get(
                `api/post/all?board=${id}&page=${page}`
            );
            commit('setPosts', {
                content: res.data.content,
                number: res.data.number,
                totalPages: res.data.totalPages
            });
        },
        async getPostsInPostCategory({commit}, {id, page}) {

            const res = await axios.get(
                `api/post?category=${id}&page=${page}`
            );
            commit('setPosts', {
                content: res.data.content,
                number: res.data.number,
                totalPages: res.data.totalPages
            });
        },
        async getPostsBySearchKeywordInBoard({commit}, {boardId, page, type, keyword}) {
            const res = await axios.get(
                `api/post/search?board=${boardId}&page=${page}&type=${type}&keyword=${keyword}`
            );
            commit('setPosts', {
                content: res.data.content,
                number: res.data.number,
                totalPages: res.data.totalPages
            });
        },
        async getPostsBySearchKeywordInPostCategory({commit}, {boardId, categoryId, page, type, keyword}) {

            const res = await axios.get(
                `api/post/search?board=${boardId}&category=${categoryId}&page=${page}&type=${type}&keyword=${keyword}`
            );
            commit('setPosts', {
                content: res.data.content,
                number: res.data.number,
                totalPages: res.data.totalPages
            });
        },
    },
}