import { MutationTree } from 'vuex';
import { State } from './state';
import { saveToStorage } from 'src/helper/localStorage';

const mutations: MutationTree<State> = {

    setIsLoggedIn(state, data) {
        state.isLoggedIn = data;
        saveToStorage('isLoggedIn', data);
    },

    setUsername(state, data) {
        state.username = data
        saveToStorage('username', data);
    },

    setPosts(state, data) {
        state.posts = data
    },

    setUsers(state, data) {
        state.users = data
    }
};

export default mutations;
