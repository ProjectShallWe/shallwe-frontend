import axios from "@/axios";

export default {
    namespaced: true,
    state: {
        boardCategories: [],
    },
    mutations: {
        setBoardCategories(state, payload) {
            state.boardCategories = payload;
        },
    },
    actions: {
        async getBoardCategoryWithBoards({commit}) {

            const res = await axios.get(
                'api/board-category/board'
            );
            commit('setBoardCategories', res.data);
        }
    },
}