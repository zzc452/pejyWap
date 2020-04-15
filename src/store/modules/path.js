import * as types from '../mutations-type'
import cache from '@/utils/cache'

// 保存路由信息
export default{
    namespaced: true,
    state: {
        loginToPath:cache.setLocal("loginToPath")? cache.setLocal("loginToPath"): encodeURI('/home'),
        isWeChat:false
    },
    mutations: {
        [types.SAVE_LOGIN_REDIRECT_PATH](state,val){
            let url = encodeURI(val)
            state.loginToPath = url;
            cache.setLocal('loginToPath',url);
        },
        [types.CLEAR_LOGIN_REDIRECT_PATH](state){
            state.loginToPath = '';
            cache.removeLocal('loginToPath');
        },
        [types.SAVE_BROWSER](state,val){
            state.isWeChat = val;
            cache.setLocal('isWeChat',val);
        },
        
    }
}