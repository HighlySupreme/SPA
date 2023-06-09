import { MutationTree } from 'vuex';
import { State } from './state';

const mutations: MutationTree<State> = {

    setIsLogin(state, data) {
        state.isLogin = data;
    },

    setUsername(state, data) {
        state.username = data
    }
};

export default mutations;
