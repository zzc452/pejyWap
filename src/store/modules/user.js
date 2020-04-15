import * as types from '../mutations-type'
import cache from '@/utils/cache'
import { loginByWxCode } from '@/api/login'
// 存储个人信息相关

export default {
    namespaced: true,
    state: {
        userInfo: cache.getLocal("userInfo") ? JSON.parse(cache.getLocal("userInfo")) : null,
        wxLoginStatus:0
    },
    mutations: {
        [types.SAVE_USER](state, val) {
            state.userInfo = val;
            cache.setLocal('userInfo', val);
        },
        [types.CLEAR_USER](state) {
            state.userInfo = null;
            cache.removeLocal('userInfo');
        },
        [types.SET_WXLOGIN_STATUS](state,val) {
            state.wxLoginStatus = val;
            cache.setLocal('wxLoginStatus', val);
        },
    },
    actions: {
        // 登录相关，通过code获取token和用户信息，用户根据自己的需求对接后台
        loginWxAuth({ commit }, code) {
            const data = {
                code: code
            }
            return new Promise((resolve, reject) => {
                loginByWxCode(data)
                    .then(res => {
                        // 存用户信息，token
                        commit('SAVE_USER', res.data.data);
                        commit('SET_LOGIN_STATUS', 2)
                        resolve(res)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        // 设置微信登录状态
        setWxLoginStatus({ commit }, query) {
            if (query === 0 || query === 1) {
                commit('CLEAR_USER')
            }
            // 设置不同的登录状态
            commit('SET_LOGIN_STATUS', query)
        },
        // 登出
        fedLogOut({ commit }) {
            commit('SAVE_USER');
            commit('SET_LOGIN_STATUS', 0);
        }
    }
}