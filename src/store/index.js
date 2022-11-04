import {createStore} from "vuex";
import modules from "@/store/modules";
import createPersistedState from "vuex-persistedstate";

export default createStore({
    modules,
    plugins: [
        createPersistedState({
            paths: [
                'login',
                'boardSearchBar',
                'boardCategoryList',
                'postListMain',
                'postListMini',
                'postDetail'
            ]
        }),
    ]
});