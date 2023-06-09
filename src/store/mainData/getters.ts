import { GetterTree } from 'vuex';
import { State } from './state';

const getters: GetterTree<State, any> = {
    isLogin: (state) => {
        return state.isLogin;
    },
    getUsername: (state) => {
        return state.username;
    },
};

export default getters;
