import axios from "@/axios";

export default {
    namespaced: true,
    state: {
        allRecommendPosts: [],
        boardRecommendPosts: [],
    },
    mutations: {
        setAllRecommendPosts(state, payload) {
            state.allRecommendPosts = payload;
        },
        setBoardRecommendPosts(state, payload) {
            state.boardRecommendPosts = payload;
        }
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
        }
    },
}