import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import mainData from './mainData'
import { StateInterface } from './state'

Vue.use(Vuex)

const store: Store<StateInterface> = new Vuex.Store({
    modules: {
        mainData
    },
})

export { StateInterface }
export default store
