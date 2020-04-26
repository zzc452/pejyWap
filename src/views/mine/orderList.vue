<!-- 订单列表 -->
<template>
    <div id="order-list-wrap">
        <MyHeader title="我的订单" :fixed="true"></MyHeader>
        <div class="top-select-box">
            <van-sticky offset-top="46">
                <van-tabs @click="changeStatus" :border="false" v-model="order_status" color="#FF6900" line-height="2" line-width="12" title-active-color="#FF6900" title-inactive-color="#000000">
                    <van-tab title="全部订单" name="1"></van-tab>
                    <van-tab title="待付款" name="2"></van-tab>
                    <van-tab title="已支付" name="3"></van-tab>
                    <van-tab title="已取消" name="3"></van-tab>
                </van-tabs>
            </van-sticky>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                order_status:1
            }
        },
        methods:{
            changeStatus(val){
                console.log(val)
            }
        }
    }
</script>
<style lang="less">
    #order-list-wrap{
        min-height:100vh;
        background: @bg2Grey;
        box-sizing: border-box;
        padding-top:46px;
        .top-select-box{
            .van-tab--active{
                font-weight: bold;
            }
            .van-tabs__nav--line{
                padding-bottom: 11px;
            }

        }
    }
</style>