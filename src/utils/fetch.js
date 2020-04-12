// 二次封装axios方法
import axios from 'axios'
// import qs from 'qs'
import store from '@/store'
import { baseUrl } from '@/config/env'
import { Toast } from 'vant'


// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.timeout = 10000;

var service = axios.create({
    timeout:10000
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
        //   默认是自己服务器api
      if(!config.defaultUrl){
        config.url = baseUrl+config.url;
      }
      if (store.getters.token) {
        config.headers['token'] = store.getters.token
      }
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
      // 这里注意修改成你访问的服务端接口规则
      if (res.status && res.status == 1) {
        // 登录超时,重新登录
        if (res.status === 401) {
          store.dispatch('user/fedLogOut').then(() => {
            location.reload()
          })
        }
        return Promise.reject(res || 'error')
      } else {
        return Promise.resolve(res)
      }
    },
    error => {
      Toast.clear()
      console.log('err' + error) // for debug
      return Promise.reject(error)
    }
  )
  
  export default service

// export let fetch = async ( url = "", data = {}, type = "POST") => {
//     let result
//     type = type.toUpperCase()
//     url = baseUrl + url;
//     if (type === 'GET') {
//         await axios.get(url, { params: data })
//             .then(res => {
//                 result = res.data
//             })
//     } else if (type === "POST") {
//         await axios.post(url, qs.stringify(data))
//             .then(res => {
//                 result = res.data
//             })
//     }
//     return result;
// }
