import {axiosBasic} from "@/axios";

export default {
    namespaced: true,
    state: {
        realTimeBestPosts: [],
        page: 0,
        totalPages: 0,
    },
    mutations: {
        setRealTimeBestPosts(state, {content, number, totalPages}) {
            state.realTimeBestPosts = content;
            state.page = number;
            state.totalPages = totalPages
        },
    },
    actions: {
        async getRealTimeBestPosts({commit}, {page}) {
            const res = await axiosBasic.get(
                `api/post/recommend/main?page=${page}`
            );
            commit('setRealTimeBestPosts', {
                content: res.data.content,
                number: res.data.number,
                totalPages: res.data.totalPages,
            });
        },
    }
}