// 订单相关接口
import fetch from '@/utils/fetch'


// 获取省市区三联
export function getThreeArea (params) {
    let url= '/admin/area/';
    if(params === 0 || !!params){
        url+=params
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
export function getAddressInfo (params) {
	let url= '/api/address/info/';
    if(params === 0 || !!params){
        url+=params
    }
	return fetch({
		url: url,
        method: 'get',
	})
}