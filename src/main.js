import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//  登录检测
router.beforeEach((to, from, next) => {
  if(to.meta.requireLogin){
    if(store.state.user.userInfo){
      next();
    }else{
      // 用vuex存储跳转信息
      store.commit('path/SAVE_LOGIN_REDIRECT_PATH',to)
      router.push({ path: '/login'})
    }
  }else{
    next();
  }
})