import * as types from '../mutations-type'
import cache from '@/utils/cache'
import { getHotserch } from '@/api/home'
// 保存路由信息
export default {
    namespaced: true,
    state: {
        hotSearch: cache.getSession("hotSearch") && cache.getSession("hotSearch") != "undefined" ?JSON.parse(cache.getSession("hotSearch")) : {},
        historySearch: cache.getLocal("historySearch") && cache.getLocal("historySearch") != "undefined" ?JSON.parse(cache.getLocal("historySearch")) : '',
    },
    mutations: {
        [types.SAVE_HOTSEARCH](state, val) {
            state.accountInfo = val;
            cache.setSession('hotSearch', JSON.stringify(val));
        },
        [types.SAVE_HISTORYSEARCH](state, val) {
            state.accountInfo = val;
            cache.setLocal('hotSearch', JSON.stringify(val));
        }
    },
    actions: {
        async getHotData({ commit,state }) {
            let res;
            if(JSON.stringify(state.hotSearch) != "{}"){
                res = state.hotSearch
            }else{
                await getHotserch()
                    .then(json => {
                        res = json
                        if (json.status === 1) {
                            commit('SAVE_HOTSEARCH', json)
                        }
                    })
            }
            return res;
        },
        saveHistory({commit,state},params) {
            let his = state.historySearch ?state.historySearch:[];
            his.unshift(params);
            let data = his.splice(0,9)
            commit('SAVE_HISTORYSEARCH',data)
        }
    }
}