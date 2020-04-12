import Vue from 'vue'
import Vuex from 'vuex'

import user_module from './modules/user'
import path_module from './modules/path'

import getters from './getter'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user:user_module,
    path:path_module,
  },
  getters
})
