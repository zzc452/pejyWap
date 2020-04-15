
import fetch from '@/utils/fetch'
// 课程相关接口

// 获取课程设置的年级科目等属性
export function getCourseSetting (params) {
    let url = '/admin/attr/attribute/';
    switch(params){
        case "grade":
            url = url+7;
            break;
        case "grade_2":
            url = url+4;
            break;
        default:
            url = url+0;
    }
	return fetch({
		url: url,
		method: 'get',
        noToken:true,
	})
}
// 获取课程列表
export function getCourseList (params) {
	return fetch({
		url: '/api/course/list',
		method: 'get',
		noToken:true,
		params :params
	})
}
