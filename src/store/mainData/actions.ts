import { ActionTree } from 'vuex';
import { State } from './state';
import {RestService} from "src/services/rest.service";

const actions: ActionTree<State, any> = {
    logIn({ commit }, { username }) {
        commit('setIsLoggedIn', true);
        commit('setUsername', username);
    },
    logOut({ commit }) {
        commit('setIsLoggedIn', false);
        commit('setUsername', '');
    },
    async fetchUsers({ commit }) {
        try {
            const users = await RestService.getUsers();
            commit('setUsers', users);
            return users
        } catch (error) {
            console.log('Failed to fetch users:', error)
        }
    },
    async fetchPosts({ dispatch, commit }) {
        try {
            await dispatch('fetchUsers');
            const posts = await RestService.getPosts();
            commit('setPosts', posts);
            return posts
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    },
};

export default actions;
