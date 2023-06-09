import { GetterTree } from 'vuex';
import { State } from './state';

const getters: GetterTree<State, any> = {
    isLoggedIn: (state) => {
        return state.isLoggedIn;
    },
    getUsername: (state) => {
        return state.username;
    },
    getUsers: (state) => {
        return state.users
    },
    getUserById: (state) => (id: number) => {
        return state.users.find(user => user.id === id);
    },
};

export default getters;
