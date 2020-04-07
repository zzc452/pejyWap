
/**
 * 配置测试和生产环境之间的切换
 * 
 * baseUrl: 域名地址
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = '';
let imgBaseUrl = '';


if (process.env.NODE_ENV == 'development') {
    imgBaseUrl = '/img/';
    baseUrl = '';

} else if (process.env.NODE_ENV == 'production') {
    baseUrl = '';
    imgBaseUrl = '';
}

export {
    baseUrl,
    imgBaseUrl,
}