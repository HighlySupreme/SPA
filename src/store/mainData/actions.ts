import { ActionTree } from 'vuex';
import { State } from './state';

const actions: ActionTree<State, any> = {
    logIn({ commit }, { username }) {
        commit('setIsLoggedIn', true);
        commit('setUsername', username);
    },
    logOut({ commit }) {
        commit('setIsLoggedIn', false);
        commit('setUsername', '');
    },
};

export default actions;
