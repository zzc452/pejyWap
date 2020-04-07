import * as types from '../mutations'
import cache from '../../config/cache'

// 保存路由信息
export default{
    namespaced: true,
    state: {
        loginToPath:cache.getSession("loginToPath")? JSON.parse(cache.getSession("loginToPath")): ''
    },
    mutations: {
        [types.SAVE_LOGIN_REDIRECT_PATH](state,val){
            state.loginToPath = val;
            cache.setSession('loginToPath',val);
        },
        [types.CLEAR_LOGIN_REDIRECT_PATH](state){
            state.loginToPath = null;
            cache.removeSession('loginToPath');
        }
    }
}