// 时间格式化
import moment from "moment";
export let formatDate = (dataStr, pattern = 'YYYY-MM-DD')=>{
    if (dataStr) {
        return moment(dataStr).format(pattern)
    } else {
        return dataStr
    }
}
export let formatUrl = (dataStr)=>{
    if (dataStr) {
        return decodeURIComponent(dataStr)
    } else {
        return dataStr
    }
}