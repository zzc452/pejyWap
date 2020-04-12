
/**
 * 配置测试和生产环境之间的切换
 * 
 * baseUrl: 域名地址
 * 
 */

let baseUrl = '';

if (process.env.NODE_ENV == 'production') {
    if(process.env.VUE_APP_FLAG === 'pro'){
        // 生产环境
        baseUrl = '';
    }else{
        // 测试环境
        baseUrl = '';
    }
} else {
    // 本地开发环境
    baseUrl = 'http://192.168.155.80';
}
export {
    baseUrl,
}