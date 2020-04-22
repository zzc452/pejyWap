// 订单相关接口
import fetch from '@/utils/fetch'


// 获取省市区三联
export function getThreeArea (param) {
    let url= '/admin/area/';
    if(param === 0 || !!param){
        url+=param
    }
	return fetch({
		url: url,
        method: 'get',
        hideloading:true
	})
}
// 编辑收货地址
export function addAddressData (params) {
	return fetch({
		url: '/api/address/create',
		method: 'post',
		data: params
	})
}
// 修改收货地址
export function updateAddressData (params) {
	return fetch({
		url: '/api/address/update',
		method: 'post',
		data: params
	})
}
// 删除收货地址
export function deleteAddressData (params) {
	return fetch({
		url: '/api/address/delete',
		method: 'post',
		data: params
	})
}

// 获取收货地址列表
export function getAddressList () {
	return fetch({
		url: '/api/address/list',
		method: 'get'
	})
}
// 获取收货地址列表
export function getAddressInfo (param) {
	let url= '/api/address/info/';
    if(param === 0 || !!param){
        url+=param
    }
	return fetch({
		url: url,
        method: 'get',
	})
}
// 购买课程详情
export function getBuyCourseInfo (params) {
	return fetch({
		url:'/api/course/buy/info',
		params: params,
        method: 'get',
	})
}
// 下单
export function creadeOrderData (params) {
	return fetch({
		url: '/api/order/create',
		method: 'post',
		data: params,
		hideloading:true
	})
}
// 获取订单详情
export function getOrderInfo (params) {
	return fetch({
		url: '/api/order/select/pay',
		params: params,
        method: 'get'
	})
}
// 支付
export function payOrder (params) {
	return fetch({
		url: '/api/order/pay',
		method: 'post',
		data: params
	})
}
