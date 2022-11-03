import {createRouter, createWebHistory} from 'vue-router';
import Home from "@/page/index";
import Community from "@/page/community/index";
import Board from "@/page/community/board/_id"
import PostCreate from "@/page/community/board/create"
import PostDetail from "@/page/community/board/post/_id"
import Search from "@/page/community/board/search/index"
import Info from "@/page/user/index"
import Login from "@/page/user/login";
import SignUp from "@/page/user/signUp";

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        // 뒤로 가기, 앞으로 가기 버튼 클릭시 이전에 보던 scroll 위치를 반환
        if (savedPosition) {
            return savedPosition;
        }
        // page query, category query가 변경되면 화면 최상단으로 이동하지 않는다.
        if (to.query.page !== from.query.page
            || to.query.category !== from.query.category) {
            return
        }
        // 화면 최상단으로 이동한다.
        return { top: 0 };
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/community',
            name: 'community',
            component: Community
        },
        {
            path: '/community/:boardId',
            name: 'board',
            component: Board
        },
        {
            path: '/community/:boardId/create',
            name: 'postCreate',
            component: PostCreate
        },
        {
            path: '/community/:boardId/:postId',
            name: 'postDetail',
            component: PostDetail
        },
        {
            path: '/community/search',
            name: 'search',
            component: Search
        },
        {
            path: '/user/:nickname',
            name: 'info',
            component: Info
        },
        {
            path: '/user/login',
            name: 'login',
            component: Login
        },
        {
            path: '/user/sign-up',
            name: 'signUp',
            component: SignUp
        },
    ]
});

const makeTitle = (title) => {
    return title ? `${title} - ShallWe` : "ShallWe";
}

router.beforeEach((to, from, next) => {
    document.title = makeTitle(to.meta.title);
    next()
})

export default router;