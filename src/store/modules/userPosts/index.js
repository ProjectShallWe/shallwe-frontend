import axios from "@/axios";

export default {
    namespaced: true,
    state: {
        posts: [],
        page: 0,
        totalPages: 0,
    },
    mutations: {
        setPosts(state, {content, number, totalPages}) {
            state.posts = content;
            state.page = number;
            state.totalPages = totalPages
        },
    },
    actions: {
        async getPostsByNickname({commit}, {page}) {

            const res = await axios.get(
                `api/post/nickname?page=${page}`,
                {
                    headers: {
                        Authorization: localStorage.getItem('userToken'),
                    }
                }
            );
            commit('setPosts', {
                content: res.data.content,
                number: res.data.number,
                totalPages: res.data.totalPages
            });
        },
    },
}