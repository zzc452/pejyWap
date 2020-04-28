import Vue from 'vue'
import Vuex from 'vuex'

import user_module from './modules/user'
import path_module from './modules/path'
import order_module from './modules/order'
import mine_module from './modules/mine'
import search_module from './modules/search'

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
    mine:mine_module,
    search:search_module,
  },
  getters
})
