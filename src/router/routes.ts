import {RouteConfig} from 'vue-router';

const MainLayout = () => import('layouts/MainLayout.vue');
const UserList = () => import('pages/UserList.vue')
const PostList = () => import('pages/PostList.vue')


const routes: RouteConfig[] = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '/users',
                component: UserList,
            },
            {
                path: '/posts',
                component: PostList,
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
