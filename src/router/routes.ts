import {RouteConfig} from 'vue-router';

const MainLayout = () => import('layouts/MainLayout.vue');
const HomePage = () => import('pages/HomePage.vue');
const UserList = () => import('pages/UserList.vue')
const PostList = () => import('pages/PostList.vue')
const LogIn = () => import('pages/LogIn.vue')


const routes: RouteConfig[] = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '/',
                component: HomePage,
            },
            {
                path: '/users',
                component: UserList,
            },
            {
                path: '/posts',
                component: PostList,
            },
            {
                path: '/log-in',
                component: LogIn,
            }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
];

export default routes;
