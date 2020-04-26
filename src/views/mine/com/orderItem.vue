<!-- 订单列表项组件 -->
<template>
    <div class="order-item-box">
        <div class="has-data">
            <div class="order-item">
                <div class="top-row">
                    <div class="title" v-show="false">
                        <h2>已支付</h2> <div class="btn-delete"><img src="../../../assets/img/icon_delete.png" alt=""></div>
                    </div>
                    <div class="title title2">
                        <van-count-down :time="down_time" /><h2> 倒计时结束该订单将自动取消</h2>
                    </div>
                    <h4>初中三年级语文冲刺提分班</h4>
                    <p>主讲老师：胡亦佳</p>
                </div>
                <van-divider :style="{ borderColor: '#dddddd', margin: '0.4rem 0' }" />
                <div class="footer">
                    <div class="price">应付款：<strong>￥1898.00</strong></div>
                    <div class="button-box">
                        <van-button plain size="small">取消订单</van-button>
                        <van-button size="small" color="linear-gradient(to right,#ff7315,#e85c02)">去支付</van-button>
                    </div>
                </div>
            </div>
            <div class="order-item">
                <div class="top-row">
                    <div class="title" >
                        <h2>已支付</h2> <div class="btn-delete"><img src="../../../assets/img/icon_delete.png" alt=""></div>
                    </div>
                    <div class="title title2" v-show="false">
                        <van-count-down :time="down_time" /><h2> 倒计时结束该订单将自动取消</h2>
                    </div>
                    <h4>初中三年级语文冲刺提分班</h4>
                    <p>主讲老师：胡亦佳</p>
                </div>
                <van-divider :style="{ borderColor: '#dddddd', margin: '0.4rem 0' }" />
                <div class="footer">
                    <div class="price">应付款：<strong>￥1898.00</strong></div>
                    <div class="button-box" v-if="false">
                        <van-button plain size="small">取消订单</van-button>
                        <van-button size="small" color="linear-gradient(to right,#ff7315,#e85c02)">去支付</van-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                down_time:1800*1000
            }
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {},
        //生命周期 - 挂载完成（访问DOM元素）
        mounted() {}
    }
</script>
<style scoped lang="less">
    @imgUrl:'../../../assets/img/';
    .order-item-box {
        .order-item {
            padding:0 .373333rem;
            background: @bgWhite;
            box-shadow:-1px 3px 8px 0px rgba(0, 0, 0, 0.08);
            border-radius: .373333rem;
            margin-bottom: .266667rem;
            overflow: hidden;
            .top-row {
                font-size: 12px;
                .title {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding:.4rem 0 .373333rem;
                    h2 {
                        color: #F13536;
                        font-size: 12px;
                        line-height: 1.2em;
                        &.expire {
                            color: @txtBlack;
                        }
                    }
                    .btn-delete{
                        width: 18px;
                        height: 20px;
                        cursor: pointer;
                        img{
                            width: 100%;
                            height: auto;
                        }
                    }
                }
                .title2{
                    font-weight: bold;
                    justify-content: flex-start;
                    padding-left: .853333rem;
                    background: url("@{imgUrl}icon_timeDown.png") 0 center no-repeat;
                    background-size:.533333rem auto;
                    .van-count-down{
                        font-size: 12px;
                        color: #F13536;
                        line-height: 1.2em;
                        margin-right: 5px;
                    }
                }
                h4 {
                    font-size: 12px;
                    color: @txtBlack;
                    margin-bottom: .32rem;
                }
                p{
                    color: @txtGrey;
                }
            }
            .footer{
                .price{
                    text-align: right;
                    color: @txtBlack;
                    font-size: 13px;
                    margin-bottom: .373333rem;
                    line-height: 18px;
                    strong{
                        font-size: 15px;
                    }
                }
                .button-box{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin-bottom: .373333rem;
                    margin-top: -0.08rem;
                    
                    button{
                        font-size: 14px;
                        width: 80px;
                        height: 28px;
                        line-height: 25px;
                        padding:0;
                        margin-left: .4rem;
                        border-radius: 3px;
                    }
                    .van-button--plain{
                        color: #666666;
                    }
                    .van-button--default{
                        border-color: #666666;
                    }
                }
            }
        }
    }
</style>