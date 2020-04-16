
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
    let config = {
		url: '/api/course/list',
		method: 'get',
		noToken:true
	}
    if(params.type !== 'default'){
        config.hideloading = true;
    }
    delete params.type;
    config.params = params;
	return fetch(config)
}
// 获取课程详情
export function getCourseInfo (params) {
    let url= '/api/course/info/';
    url += params.id
    let config = {
		url: url,
		method: 'get',
	}
	return fetch(config)
}