<!-- 登录按钮组件 -->
<template>
    <div id="login-btn-box">
        <van-button v-show="!can_submie" block color="#d1d1d1" native-type="button">{{title}}</van-button>
        <van-button v-show="can_submie" :loading="this.isLogining" :loading-text="titleing" :native-type="this.isLogining ? 'button' : 'submit'" block color="linear-gradient(to right, #ff6900, #de5900)" >{{title}}</van-button>
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
            },
            title:{
                type:String,
                default:'登录'
            }
        },
        computed:{
            titleing(){
                return this.title+'中...'
            }
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