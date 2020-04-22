import * as types from '../mutations-type'
import cache from '@/utils/cache'

// 保存路由信息
export default{
    namespaced: true,
    state: {
        orderInfoAddr:cache.getSession("orderInfoAddr") && cache.getSession("orderInfoAddr")!=="undefined" ? cache.getSession("orderInfoAddr"): null
    },
    mutations: {
        [types.SET_ORDER_ADDR](state,val){
            let addr = JSON.stringify(val)
            state.orderInfoAddr = addr;
            cache.setSession('orderInfoAddr',addr);
        },
        [types.CLEAR_ORDER_ADDR](state){
            state.orderInfoAddr = null;
            cache.setSession('orderInfoAddr');
        }
    }
}