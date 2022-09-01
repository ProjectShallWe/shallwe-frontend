import axios from "@/axios";

export default {
    namespaced: true,
    state: {
        boardCategories: [],
    },
    mutations: {
        setBoardCategories(state, boardCategories) {
            state.boardCategories = boardCategories;
        },
    },
    actions: {
        async getBoardCategoryWithBoards({commit}) {

            const res = await axios.get(
                'api/board-category/board'
            );
            commit('setBoardCategories', {
                boardCategories: res.data
            });
        }
    },
}