import qs from 'qs'
import fetch from '@/utils/fetch'
// 快捷登录
export function quickLogin (params) {
	return fetch({
		url: '/api/mobile/login',
		method: 'post',
		data: qs.stringify(params)
	})
}
// 获取短信验证码
export function getMobileCode (params) {
	return fetch({
		url: '/api/mobile/code',
		method: 'post',
		data: qs.stringify(params)
	})
}
// 账号登录
export function accountLogin (params) {
	return fetch({
		url: '/api/access/login',
		method: 'post',
		data: qs.stringify(params)
	})
}
// 重置密码
export function passRepassword (params) {
	return fetch({
		url: '/api/mobile/login',
		method: 'post',
		data: qs.stringify(params)
	})
}
// 微信登录
export function loginByWxCode (params) {
	return fetch({
		url: '/api/mobile/login',
		method: 'post',
		data: qs.stringify(params)
	})
}

