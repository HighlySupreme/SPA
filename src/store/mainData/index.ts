import { Module } from 'vuex';
import state, { State } from './state';
import getters from './getters';
import mutations from './mutations';

const mainData: Module<State, any> = {
    namespaced: false,
    state,
    getters,
    mutations,
};


export default mainData;
