<!-- 更改密码 -->
<template>
    <div id="change-password-wrap">
        <MyHeader title="修改密码"></MyHeader>      
        <resetPassword kind="change" btntxt=""></resetPassword>  
    </div>
</template>

<script>
    import resetPassword from "../login/com/resetPassword"
    export default {
        name:"changePassword",
        components:{
            resetPassword
        }
    }
</script>
<style lang="less">
    #change-password-wrap{
        min-height: 100vh;
        background: @bg2Grey;
        .reset-password-box{
            padding: .48rem 0 0;
            .input-wrap{
                padding: 0 .333333rem;
                background: @bgWhite;
                .van-cell:nth-last-child(2)::after{
                    border-width:0;
                }
            }
            .my-orange-btn{
                padding: 0 .333333rem;
            }
        }
    }
</style>