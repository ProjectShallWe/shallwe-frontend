import {axiosBasic} from "@/axios";

export default {
    namespaced: true,
    state: {
        allRecommendPosts: [],
        boardRecommendPosts: [],
        boardsRecommendPosts: [],
        recommendBoards: {},

    },
    mutations: {
        setAllRecommendPosts(state, payload) {
            state.allRecommendPosts = payload;
        },
        setBoardRecommendPosts(state, payload) {
            state.boardRecommendPosts = payload;
        },
        setBoardsRecommendPosts(state, payload) {
            state.boardsRecommendPosts = payload;
        },
        setRecommendBoards(state, payload) {
            state.recommendBoards = payload;
        }
    },
    actions: {
        async getRecommendPostsFromRedis({commit}) {

            const res = await axiosBasic.get(
                `/api/post/recommend/all`
            );
            commit('setAllRecommendPosts', res.data);
        },
        async getRecommendPostsInBoardFromRedis({commit}, {id}) {

            const res = await axiosBasic.get(
                `/api/post/recommend?board=${id}`
            );
            commit('setBoardRecommendPosts', res.data);
        },
        async getRecommendBoardsFromRedis({commit}) {
            const res = await axiosBasic.get(
              `/api/board/recommend`
            );
            commit('setRecommendBoards', res.data);
        },
        async getRecommendPostsInBoardsFromRedis({commit}, {boardRecommendIdList}) {

            const boardArr = [];
            const listLength = boardRecommendIdList.length;
            // 현재 추천할 게시판의 수가 6개 미만이면 앞에서 6개가 될 때 까지 채운다.
            if (listLength < 6) {
                for (let i = 1; i <= 6-listLength; i++) {
                    if (!boardRecommendIdList.includes(i)) {
                        boardRecommendIdList.push(i);
                    }
                }
            }
            // 현재 추천할 게시판의 개수가 6개 이상이면 추천 로직을 적용한다.
            if (listLength >= 6) {
                boardRecommendIdList = boardRecommendIdList.slice(0,6);
            }

            for (const id of boardRecommendIdList) {
                const res = await axiosBasic.get(
                    `/api/post/recommend?board=${id}`
                );
                boardArr.push(res.data);
            }

            commit('setBoardsRecommendPosts', boardArr);
        }
    },
}