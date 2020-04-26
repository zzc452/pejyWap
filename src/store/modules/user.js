import * as types from '../mutations-type'
import cache from '@/utils/cache'
import { loginByWxCode } from '@/api/login'
// 存储个人信息相关

export default {
    namespaced: true,
    state: {
        userInfo: cache.getLocal("userInfo") ? JSON.parse(cache.getLocal("userInfo")) : null,
        wxLoginStatus: 0
    },
    mutations: {
        [types.SAVE_USER](state, val) {
            state.userInfo = val;
            cache.setLocal('userInfo', JSON.stringify(val));
        },
        [types.CLEAR_USER](state) {
            state.userInfo = null;
            cache.removeLocal('userInfo');
        },
        [types.SET_WXLOGIN_STATUS](state, val) {
            state.wxLoginStatus = val;
            cache.setLocal('wxLoginStatus', val);
        },
    },
    actions: {
        // 登录相关，通过code获取token和用户信息，用户根据自己的需求对接后台
        async loginWxAuth({ commit }, code) {
            let params = {
                code: code
            }
            let data
            await loginByWxCode(params)
                .then(res => {
                    data = res
                    if (res.status === 1) {
                        // 存用户信息，token
                        commit('SAVE_USER', res.data.data);
                    }
                })
            return data;
        },
        // 设置微信登录状态
        setWxLoginStatus({ commit }, query) {
            if (query === 0 || query === 1) {
                commit('CLEAR_USER')
            }
            // 设置不同的登录状态
            commit('SET_WXLOGIN_STATUS', query)
        },
        // 退出登录
        logOut({ commit }) {
            commit('CLEAR_USER');
            commit('SET_WXLOGIN_STATUS', 0);
        }
    }
}