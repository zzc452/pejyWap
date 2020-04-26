<!-- 微信支付手动查询结果 -->
<template>
    <div id="pay-check-wrap">
        <MyHeader title="确认支付是否完成"></MyHeader>
        <div class="content-box">
            <h4>请您确认支付是否完成</h4>
            <MyButton title="已经支付完成" @click="completePay"></MyButton>       
            <van-button block type="default">遇到支付问题重新支付</van-button>     
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods:{
            completePay(){
                console.log(123132)
            }
        }
    }
</script>
<style lang="less">
    #pay-check-wrap{
        min-height:100vh;
        background: @bgWhite;
        .content-box{
            text-align: center;
            padding: 2.933333rem .333333rem 0;
            h4{
                font-size: 18px;
                color: @txtOrange;
                margin-bottom: 1.226667rem;
            }
            .my-orange-btn{
                margin-bottom: .506667rem;
            }
            .van-button{
                font-size: 16px;
            }
            .van-button--default{
                color: #666;
            }
        }
    }
</style>