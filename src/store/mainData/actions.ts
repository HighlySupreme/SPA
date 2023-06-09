import { ActionTree } from 'vuex';
import { State } from './state';

const actions: ActionTree<State, any> = {
    setLogout({ commit }) {
        commit('setIsLogin', false);
        commit('setUsername', '');
    },
};

export default actions;
