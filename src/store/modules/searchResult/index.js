import axios from "@/axios";

export default {
    namespaced: true,
    state: {
        boards: [],
        posts: [],
        page: 0,
        totalPages: 0,
    },
    mutations: {
        setBoardsByKeyword(state, payload) {
            state.boards = payload;
        },
        setPostsByKeyword(state, {content, number, totalPages}) {
            state.posts = content;
            state.page = number;
            state.totalPages = totalPages;
        },
    },
    actions: {
        async getBoardsByKeyword({commit}, {keyword}) {

            const res = await axios.get(
                `api/board?keyword=${keyword}`
            );
            commit('setBoardsByKeyword', res.data);
        },
        async getPostsByKeyword({commit}, {keyword, page}) {

            const res = await axios.get(
                `api/post/search/common?keyword=${keyword}&page=${page}`
            );
            commit('setPostsByKeyword', {
                content: res.data.content,
                number: res.data.number,
                totalPages: res.data.totalPages,
            });
        },
    },
}