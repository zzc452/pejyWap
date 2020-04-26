<!-- 公共橙色风格按钮 -->
<template>
    <div class="my-orange-btn" @click="$emit('click')">
        <van-button :loading="this.isLogining" :loading-text="titleing" :native-type="this.isLogining ? 'button' : 'submit'" block :color="bgColor">{{title}}</van-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props:{
            bgColor:{
                type:String,
                default:'linear-gradient(to right, #ff6900, #de5900)'
            },
            title:{
                type:String,
                default:'确定'
            },
            isLogining:{
                type:Boolean,
                default:false
            },
        },
        computed:{
            titleing(){
                return this.title+'中...'
            }
        }
    }
</script>
<style scoped>
    /* @import url(); 引入css类 */
</style>