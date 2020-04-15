// 二次封装axios方法
import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { baseUrl } from '@/config/env'
import { Toast } from 'vant'


// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.timeout = 10000;

var service = axios.create({
  timeout: 10000
});
// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      Toast.loading({
        forbidClick: true
      })
    }

    // 默认携带token
    if (!config.noToken) {
      if (store.getters.token) {
        config.headers['token'] = store.getters.token
      }
    }
    //   默认是自己服务器api
    if (!config.notDefaultUrl) {
      config.url = baseUrl + config.url;
    }
    config.method === 'post'
      ? config.data = qs.stringify({ ...config.data })
      : config.params = { ...config.params };
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    if (res.status === 0) {
      Toast(res.message);
    }
    if (res.status && res.status == 401) {
      store.dispatch('user/fedLogOut').then(() => {
        location.reload()
      })
      return Promise.reject(res || 'error')
    }
    return Promise.resolve(res)
  },
  error => {
    Toast.clear();
    return Promise.reject(error)
  }
)

export default service

