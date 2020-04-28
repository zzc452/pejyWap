import * as types from '../mutations-type'
import cache from '@/utils/cache'
import { checkBrowser } from '@/utils/methods'

// 保存路由信息
export default{
    namespaced: true,
    state: {
        loginToPath:cache.getSession("loginToPath") && cache.getSession("loginToPath")!="undefined"? cache.getSession("loginToPath"): encodeURI('/home'),
        orderToPath:cache.getSession("orderToPath") && cache.getSession("orderToPath")!="undefined"? cache.getSession("orderToPath"): encodeURI('/home'),
        isWechat:checkBrowser() == 1 ? true:false
    },
    mutations: {
        [types.SAVE_LOGIN_REDIRECT_PATH](state,val){
            let url = encodeURI(val)
            state.loginToPath = url;
            cache.setSession('loginToPath',url);
        },
        [types.CLEAR_LOGIN_REDIRECT_PATH](state){
            state.loginToPath = encodeURI('/home');
            cache.removeSession('loginToPath');
        },
        [types.SAVE_ORDER_PATH](state,val){
            let url = encodeURI(val)
            state.orderToPath = url;
            cache.setSession('orderToPath',url);
        },
        [types.CLEAR_ORDER_PATH](state){
            state.orderToPath = encodeURI('/home');
            cache.removeSession('orderToPath');
        },
    },
   
}