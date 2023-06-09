import { Module } from 'vuex';
import state, { State } from './state';
import getters from './getters';
import mutations from './mutations';
import actions from "src/store/mainData/actions";

const mainData: Module<State, any> = {
    namespaced: false,
    state,
    getters,
    mutations,
    actions
};


export default mainData;
