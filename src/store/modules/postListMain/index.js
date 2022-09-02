import axios from "@/axios";

export default {
    namespaced: true,
    state: {
        board: [],
    },
    mutations: {
        setBoard(state, payload) {
            state.board = payload;
        },
    },
    actions: {
        async getBoardWithPostCategories({commit}, payload) {

            const res = await axios.get(
                `api/board/${payload.id}`
            );
            commit('setBoard', res.data);
        }
    },
}