import {axiosAuth} from "@/axios";

export default {
    namespaced: true,
    state: {
        comments: [],
        page: 0,
        totalPages:0,
    },
    mutations: {
        setComments(state, {content, number, totalPages}) {
            state.comments = content;
            state.page = number;
            state.totalPages = totalPages
        },
    },
    actions: {
        async getCommentsByNickname({commit}, {page}) {

            const res = await axiosAuth.get(
                `api/comment/nickname?page=${page}`,
            );
            commit('setComments', {
                content: res.data.content,
                number: res.data.number,
                totalPages: res.data.totalPages
            });
        },
    },
}