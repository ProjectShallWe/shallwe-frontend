import axios from "@/axios";

export default {
    namespaced: true,
    state: {
        postCategories: [],
    },
    mutations: {
        setPostCategories(state, postCategories) {
            state.postCategories = postCategories;
        },
    },
    actions: {
        async getPostCategoriesInBoard({commit}, payload) {

            const res = await axios.get(
                `api/post-category?board=${payload.id}`
            );
            commit('setPostCategories', {
                postCategories: res.data
            });
        }
    },
}