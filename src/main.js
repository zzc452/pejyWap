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
      router.push({ path: '/login',query: { redirect: encodeURI(to.fullPath) }})
    }
  }else{
    next();
  }
})