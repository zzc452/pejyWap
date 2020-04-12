import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.$axios = axios

// 样式
import '@/assets/css/reset.css'
import '@/assets/css/default.less'

Vue.config.productionTip = false
// 引入第三方
import Vant, { Toast, Dialog } from 'vant';
import 'vant/lib/index.css';
import wechatAuth from '@/plugins/wechatAuth'
wechatAuth.setAppId(process.env.VUE_APP_WECHAT_APPID)
// 自定义组件
import myHeader from '@/components/myHeader'

Vue.use(Vant)
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog

// 注册全局组件
Vue.component('MyHeader', myHeader)


//  登录检测
router.beforeEach(async(to, from, next) => {
  let isgoLogin = /^(\/login\/)[^\s]+/.test(to.path);
  if (store.getters.token) {
    if (isgoLogin){
      next("/home");
    }else{
      next();
    }
  }else{
    if(store.state.path.isWeChat){
      const  wxStatus  = Number(store.getters.wxLoginStatus)
      if(wxStatus == 1){
          try {
            wechatAuth.returnFromWechat(to.fullPath)
            const code = wechatAuth.code
            console.log('code==', code)
            // 通过code换取token
            // await store.dispatch('user/loginWxAuth', code).then(res=>{
            //   if(res.data.data.info.mobile==""){//是否要绑定手机
            //     next();
            //   }
            //   if(res.data.data.info.selectgrade==0){//是否要绑定年级
            //     next('/selectgrade');
            //   }
            //   next(`/${store.getters.loginToPath}`)
            // })
            await store.dispatch('user/setWxLoginStatus', 2)
            next()
          } catch (err) {
            await store.dispatch('user/setWxLoginStatus', 0)
            next('/error')
          }
      }
    }
    if (to.meta.requireLogin) {
      store.commit('path/SAVE_LOGIN_REDIRECT_PATH',to.fullPath);
      next("/login");
    }else{
      next();
    }
  }
})
router.afterEach((to)=>{
  if(to.fullPath == store.getters.loginToPath){
    store.commit('path/CLEAR_LOGIN_REDIRECT_PATH');
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

