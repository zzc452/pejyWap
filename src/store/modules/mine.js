import * as types from '../mutations-type'
import cache from '@/utils/cache'
import { getMyInfo,updateMyInfo } from '@/api/mine'
// 保存路由信息
export default {
    namespaced: true,
    state: {
        accountInfo: cache.getSession("accountInfo") && cache.getSession("accountInfo") != "undefined" ?JSON.parse(cache.getSession("accountInfo")) : {},
    },
    mutations: {
        [types.SAVE_ACCOUNTINFO](state, val) {
            state.accountInfo = val;
            cache.setSession('accountInfo', JSON.stringify(val));
        }
    },
    actions: {
        async getAccountInfo({ commit,state }) {
            let res;
            let data;
            if(JSON.stringify(state.accountInfo) != "{}"){
                res = state.accountInfo
            }else{
                await getMyInfo()
                    .then(json => {
                        res = json
                        if (json.status === 1) {
                            data = json
                        }
                    })
                commit('SAVE_ACCOUNTINFO', data)
            }
            return res;
        },
        async updateAccount({commit,state},params){
            let res;
            let oldInfo = state.accountInfo
            let info = JSON.parse((JSON.stringify(state.accountInfo)));
            if(JSON.stringify(state.accountInfo) != "{}"){
                info.data.info.nickname = params.nickname
                info.data.info.sex = params.sex
                info.data.info.avatar = params.avatar
                info.data.info.class = params.class
            }
            let data = {
                avatar:params.avatar,
                sex:params.sex.id,
                nickname:params.nickname,
            }
            if(typeof params.class.id != 'undefined'){
                data.subject_id=params.class.id
            }
            await updateMyInfo(data)
            .then(json=>{
                res = json;
                if(json.status === 1){
                    oldInfo = info
                }
            })
            commit('SAVE_ACCOUNTINFO', oldInfo)
            return res;
        },
    }
}