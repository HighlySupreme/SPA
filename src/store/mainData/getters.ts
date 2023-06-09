import { GetterTree } from 'vuex';
import { State } from './state';

const getters: GetterTree<State, any> = {
    isLoggedIn: (state) => {
        return state.isLoggedIn;
    },
    getUsername: (state) => {
        return state.username;
    },
};

export default getters;
