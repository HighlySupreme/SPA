import {RouteConfig} from "vue-router";

const Home = import('pages/HomePage.vue');
const UserList = import('pages/UserList.vue')
const PostList = import('pages/PostList.vue')

export const userMenuItems: RouteConfig[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/users',
        name: 'Users',
        component: UserList,
    },
    {
        path: '/posts',
        name: 'Posts',
        component: PostList,
    }

];
