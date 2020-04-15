import fetch from '@/utils/fetch'
// 快捷登录
export function quickLogin (params) {
	return fetch({
		url: '/api/mobile/login',
		method: 'post',
		noToken:true,
		data: params
	})
}
// 获取短信验证码
export function getMobileCode (params) {
	return fetch({
		url: '/api/mobile/code',
		method: 'post',
		noToken:true,
		hideloading:true,
		data: params
	})
}
// 账号登录
export function accountLogin (params) {
	return fetch({
		url: '/api/access/login',
		method: 'post',
		noToken:true,
		data: params
	})
}
// 重置密码
export function passRepassword (params) {
	return fetch({
		url: '/api/reset/password',
		method: 'post',
		noToken:true,
		data: params
	})
}
// 微信登录
export function loginByWxCode (params) {
	return fetch({
		url: '/api/mobile/login',
		method: 'post',
		noToken:true,
		data: params
	})
}

// 绑定年级
export function bindGrade (params) {
	return fetch({
		url: '/api/user/grade',
		method: 'post',
		noToken:true,
		data: params
	})
}
