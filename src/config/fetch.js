// 二次封装axios方法
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

import { baseUrl } from './env'
Vue.prototype.$http = axios


//axios.defaults.headers.post = "application/json;charset=UTF-8";
//axios.defaults.headers.get = "application/json;charset=UTF-8";
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//axios.defaults.timeout = 10000;


export let fetch = async (type = "POST", url = "", data = {}, isSerialize = true) => {
    let result
    type = type.toUpperCase()
    url = baseUrl + url;
    if (type === 'GET') {
        await axios.get(url, { params: data })
            .then(res => {
                result = res.data
            })
    } else if (type === "POST") {
        let tempdata = data;
        if (isSerialize) {
            tempdata = qs.stringify(data);
        }
        await axios.post(url, tempdata)
            .then(res => {
                result = res.data
            })
    }
    return result;
}
