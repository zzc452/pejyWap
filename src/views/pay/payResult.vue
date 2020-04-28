<!-- 支付结果 -->
<template>
    <div id="pay-result-wrap">
        <MyHeader title="支付结果"></MyHeader>
        <div class="pay-success" >
            <div class="content-box">
                <div class="title-box van-hairline--bottom">
                    <img src="@/assets/img/pay_ok.png" alt="">
                    <p>支付完成</p>
                    <strong>-1898.00</strong>
                </div>
                <div class="info-box">
                    <van-cell title="课程名称" value="初中三年级语文冲刺提分班" />
                    <van-cell title="主讲老师" value="胡亦佳" />
                    <van-cell title="上课时间" value="3月26日-4月26日  每周六 18:30-20:30开课" />
                    <van-cell title="订单编号" value="202099999944448888" />
                    <van-cell title="购买类型" value="已经结束的直播课程产生的回放视频+剩余课程的直播和后续产出的回放视频" />
                </div>
            </div>
            <MyButton title="继续去选课"></MyButton>
        </div>
        <div class="pay-fail" v-show="false">
            <div class="content-box">
                <div class="tit-box">
                    <img src="@/assets/img/pay_fail.png" alt="">
                    <h4>支付失败</h4>
                    <p>订单支付失败，原因是余额不足<br/>或者其它原因</p>
                </div>
                <MyButton title="返回订单"></MyButton>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {},
        //生命周期 - 挂载完成（访问DOM元素）
        mounted() {}
    }
</script>
<style lang="less">
    #pay-result-wrap {
        min-height: 100vh;
        background: @bg2Grey;
        .pay-success {
            .content-box {
                background: @bgWhite;
                padding: .613333rem .453333rem .426667rem;
                .title-box {
                    color: @txtBlack;
                    padding-bottom: .48rem;
                    text-align: center;
                    img {
                        width: 1.493333rem;
                        height: auto;
                        vertical-align: top;
                        margin-bottom: .16rem;
                    }
                    p {
                        font-size: 16px;
                        margin-bottom: .24rem;
                    }
                    strong {
                        font-size: 28px;
                        line-height: 1.2em;
                        display: block;
                    }
                    &::after {
                        border-color: #EEEEEE;
                    }
                }
                .info-box {
                    padding-top: .56rem;
                    .van-cell {
                        padding: 4px 0;
                        justify-content: flex-start;
                        line-height: 1.4em;
                        .van-cell__title {
                            flex: 0 0 76px;
                            color: @txtGrey;
                        }
                        .van-cell__value {
                            text-align: left;
                            color: @txtBlack;
                        }
                        &::after {
                            border-width: 0;
                        }
                    }
                }
            }
            .my-orange-btn {
                padding: .613333rem .333333rem 0;
                .van-button--normal {
                    font-size: 16px;
                }
            }
        }
        .pay-fail {
            position: absolute;
            display: flex;
            width: 100%;
            top: 46px;
            bottom: 0;
            background: @bgWhite;
            justify-content: center;
            align-items: center;
            .content-box {
                text-align: center;
                margin: 0 auto;
                margin-top:-2.4rem;
                .tit-box {
                    margin-bottom: .853333rem;
                    img {
                        width: 1.333333rem;
                        height: auto;
                        vertical-align: top;
                    }
                    h4 {
                        font-size: 16px;
                        color: @txtBlack;
                        padding: .32rem 0 .266667rem;
                    }
                    p {
                        font-size: 14px;
                        color: @txtGrey;
                    }
                }
                .my-orange-btn{
                    height: 40px;
                    width: 110px;
                    text-align: center;
                    margin:0 auto;
                    .van-button{
                        height: 40px;
                        line-height: 38px;
                    }
                }
            }
        }
    }
</style>