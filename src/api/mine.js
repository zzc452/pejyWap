import fetch from '@/utils/fetch'
// 我的相关api

// 快捷登录
export function getMyInfo () {
	return fetch({
		url: '/api/center/index',
        method: 'get',
        hideloading:true,
	})
}
// 更新账户信息
export function updateMyInfo (params) {
	return fetch({
		url: '/api/center/update/user',
		method: 'post',
        data: params,
        hideloading:true,
	})
}