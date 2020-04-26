import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.$axios = axios

// 样式
import '@/assets/css/reset.css'
import '@/assets/css/vars.less'
import '@/assets/css/public.less'

Vue.config.productionTip = false
// 引入第三方
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)

import moment from "moment";
Vue.prototype.$moment = moment;

import wechatAuth from '@/plugins/wechatAuth'
wechatAuth.setAppId(process.env.VUE_APP_WECHAT_APPID)

// 注册全局自定义组件
import myHeader from '@/components/myHeader'
import myButton from '@/components/myButton'
import myMainnav from '@/components/myMainnva'
import myEmpty from '@/components/myEmpty'
import myError from '@/components/myError'
Vue.component('MyHeader', myHeader)
Vue.component('MyButton', myButton)
Vue.component('MyMainnav', myMainnav)
Vue.component('MyEmpty', myEmpty)
Vue.component('MyError', myError)

// 自定义全局过滤器
import * as filters from '@/utils/filters.js'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//  登录检测
router.beforeEach((to, from, next) => {
  let isgoLogin = /^(\/login)\/?[^\w]*/.test(to.path);
  if (store.getters.token) {
    if (isgoLogin) {
      next("/home");
    } else {
      next();
    }
  } else {
    if (store.state.path.isWeChat) {
      const wxStatus = Number(store.getters.wxLoginStatus)
      if (wxStatus === 1) {
        try {
          wechatAuth.returnFromWechat(to.fullPath)
          console.log('code==', wechatAuth.code)
        } catch (err) {
          store.dispatch('user/setWxLoginStatus', 0)
          next('/login')
        }
        store.dispatch('user/loginWxAuth', wechatAuth.code).then((res) => {
          if (res.status === 1) {
            store.dispatch('user/setWxLoginStatus', 2)
            if (res.data.data.bandphone) {
              next()
            } else {
              next(`/${store.getters.loginToPath}`)
            }
          } else {
            store.dispatch('user/setWxLoginStatus', 0)
            next('/login')
          }
        }).catch(() => {
          next('/404')
        })

      }
    }
    if (to.meta.requireLogin) {
      store.commit('path/SAVE_LOGIN_REDIRECT_PATH', to.fullPath);
      next("/login");
    } else {
      next();
    }
  }
})
router.afterEach((to) => {
  if (to.fullPath == decodeURI(store.getters.loginToPath) && to.fullPath!='/home') {
    store.commit('path/CLEAR_LOGIN_REDIRECT_PATH');
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

