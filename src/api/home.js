// 首页相关api
import fetch from '@/utils/fetch'
// 快捷登录
export function getHotserch (params) {
	return fetch({
		url: '/api/search/history',
		method: 'get',
		params: params
	})
}