import {axiosBasic} from "@/axios";

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

            const res = await axiosBasic.get(
                'api/board-category/board'
            );
            commit('setBoardCategories', res.data);
        }
    },
}