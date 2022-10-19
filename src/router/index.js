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