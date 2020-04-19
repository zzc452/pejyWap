<!-- 订单页 -->
<template>
    <div id="confirm-order-wrap">
        <MyHeader title="确认订单" fixed="true"></MyHeader>
        <van-notice-bar wrapable :scrollable="false" color="#6B3A18" background="#fef4eb">
            已经结束的直播课程产生的回放视频+剩余课程的直播和后 续产出的回放视频
        </van-notice-bar>
        <div class="order-area">
            <Address></Address>
            <div class="goods-info-box">
                <h6>【语文】初中三年级语文冲刺提分班</h6>
                <div class="row">
                    <div class="left">
                        <p>直播时间：</p>
                    </div>
                    <div class="right">
                        <p>3月26日-4月26日</p>
                        <p> 每周六 18:30-20:30 开课</p>
                    </div>
                </div>
                <div class="row">
                    <div class="left">
                        <p>主讲老师：</p>
                    </div>
                    <div class="right">
                        <p>胡亦佳</p>
                    </div>
                </div>
                <div class="price">
                    <em>￥998</em><strong>￥1898</strong>
                </div>
            </div>
        </div>
        <van-submit-bar button-text="立即购买" @submit="onSubmit" button-type="default">
            <div class="bottom-order-info">
                <span>共1项，实付款：</span><strong>￥1898</strong>
            </div>
        </van-submit-bar>
    </div>
</template>

<script>
    import Address from "./com/address"
    export default {
        name: "Order",
        components: {
            Address
        },
        data() {
            return {}
        },
        methods:{
            onSubmit(){
                this.$router.push('/editaddress')
            }
        }
    }
</script>
<style scoped lang="less">
    #confirm-order-wrap {
        background: #f2f2f2;
        padding: 46px 0 52px;
        min-height: 100vh;
        box-sizing: border-box;
        .van-notice-bar{
            font-size: 13px;
            line-height: 1.2em;
        }
        .order-area {
            padding: .373333rem .453333rem 0;
            .add-address-box{
                margin-bottom: .4rem;
            }
            .goods-info-box {
                padding: .426667rem .48rem .64rem .48rem;
                box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.03);
                background: @bgWhite;
                border-radius: .133333rem;
                h6 {
                    font-size: 14px;
                    color: @txtBlack;
                    margin-bottom: 10px;
                }
                .row {
                    color: @txtGrey;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    font-size: 12px;
                    line-height: 1.4em;
                    margin-bottom: .186667rem;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    .left {
                        flex: 0 0 auto;
                    }
                    .right {
                        flex: 1 0 auto;
                    }
                }
                .price {
                    text-align: right;
                    font-size: 20px;
                    line-height: 1.2em;
                    em{
                        font-size: 12px;
                        color: @txtBlack;
                        text-decoration: line-through;
                        vertical-align: initial;
                    }
                    strong{
                        font-size: 20px;
                        color: @txtOrange;
                    }
                }
            }
        }
        .van-submit-bar__bar{
            justify-content: space-between;
            .van-button{
                font-size: 16px;
                color: @txtWhite;
                border-radius: 5px;
                background: @gradualOrange;
            }
        }
        .bottom-order-info{
            line-height: 48px;
            font-size: 0;
            span{
                font-size: 13px;
                color: @txtBlack;
                vertical-align: bottom;
            }
            strong{
                font-size: 22px;
                color: @txtOrange;
                vertical-align: middle;
            }
        }
    }
</style>