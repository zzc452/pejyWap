import fetch from '@/utils/fetch'
// 学习相关接口

// 学习日历
export function getCalendar (params) {
	return fetch({
		url: '/api/study/calendar',
		method: 'get',
        params: params,
        hideloading:true
	})
}
// 日课程表
export function getDayCourse (params) {
	return fetch({
		url: '/api/study/day/course',
		method: 'get',
        params: params,
	})
}
// 参加的课程
export function getStudyCourse (params) {
	return fetch({
		url: '/api/study/course',
		method: 'get',
        params: params
	})
}
