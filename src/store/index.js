import Vue from 'vue'
import Vuex from 'vuex'

import user_module from './modules/user'
import path_module from './modules/path'
import order_module from './modules/order'

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
    order:order_module,
  },
  getters
})
