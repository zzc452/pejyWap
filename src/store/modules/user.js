import * as types from '../mutations'
import cache from '../../config/cache'
// 存储个人信息相关

export default{
    namespaced: true,
    state: {
        userInfo: cache.getLocal("userInfo")?JSON.parse(cache.getLocal("userInfo")):null
    },
    mutations: {
        [types.SAVE_USER](state,val){
            state.userInfo = val;
            cache.setLocal('userInfo',val);
        },
        [types.CLEAR_USER](state){
            state.userInfo = null;
            cache.removeLocal('userInfo');
        }
    }
}