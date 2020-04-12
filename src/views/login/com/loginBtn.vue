<!-- 登录按钮组件 -->
<template>
    <div id="login-btn-box">
        <van-button v-show="!can_submie" block color="#d1d1d1" native-type="button">登录</van-button>
        <van-button v-show="can_submie" :loading="this.isLogining" loading-text="登录中..." :native-type="this.isLogining ? 'button' : 'submit'" block color="linear-gradient(to right, #ff6900, #de5900)" >登录</van-button>
    </div>
</template>

<script>
    export default {
        props:{
            can_submie:{
                type:Boolean,
                default:false
            },
            isLogining:{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
            }
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {
        },
        //生命周期 - 挂载完成（访问DOM元素）
        mounted() {
        }
    }
</script>
<style lang="less">
    #login-btn-box{
        button{
            font-size: 18px;
            color: #FEFEFE;
        }
    }
</style>