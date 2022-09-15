import axios from "@/axios";

export default {
    namespaced: true,
    state: {
        allRecommendPosts: [],
        boardRecommendPosts: [],
        boardsRecommendPosts: [],
    },
    mutations: {
        setAllRecommendPosts(state, payload) {
            state.allRecommendPosts = payload;
        },
        setBoardRecommendPosts(state, payload) {
            state.boardRecommendPosts = payload;
        },
        setBoardsRecommendPosts(state, payload) {
            state.boardsRecommendPosts = payload;
        },
    },
    actions: {
        async getRecommendPostsFromRedis({commit}) {

            const res = await axios.get(
                `api/post/recommend/all`
            );
            commit('setAllRecommendPosts', res.data);
        },
        async getRecommendPostsInBoardFromRedis({commit}, payload) {

            const res = await axios.get(
                `api/post/recommend?board=${payload.id}`
            );
            commit('setBoardRecommendPosts', res.data);
        },
        async getRecommendPostsInBoardsFromRedis({commit}, payload) {

            const boardArr = [];

            for (const id of payload.boardCategoryIdLists) {
                const res = await axios.get(
                    `api/post/recommend?board=${id}`
                );
                boardArr.push(res.data);
            }

            commit('setBoardsRecommendPosts', boardArr);
        }
    },
}