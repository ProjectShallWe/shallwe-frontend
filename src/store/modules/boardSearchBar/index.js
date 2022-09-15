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
        async getPostsBySearchKeywordInBoard({commit}, {id, page, type, keyword}) {

            const res = await axios.get(
                `api/post/search?board=${id}&page=${page}&type=${type}&keyword=${keyword}`
            );
            commit('setBoard', res.data);
        }
    },
}