<!-- 订单页 -->
<template>
    <div id="confirm-order-wrap">
        <MyHeader title="确认订单" :fixed="true"></MyHeader>
        <div class="content-box" v-show="show_content">
            <van-notice-bar wrapable :scrollable="false" color="#6B3A18" background="#fef4eb">
                已经结束的直播课程产生的回放视频+剩余课程的直播和后 续产出的回放视频
            </van-notice-bar>
            <div class="order-area">
                <Address ref="address" :orderAddr="orderAddress" v-if="order_info.course.have_materials === 1"></Address>
                <div class="goods-info-box">
                    <h6>{{order_info.course.title}}</h6>
                    <div class="row">
                        <div class="left">
                            <p>直播时间：</p>
                        </div>
                        <div class="right">
                            <p>3月26日-4月26日</p>
                            <p> {{order_info.course.start_play_friendly}}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="left">
                            <p>主讲老师：</p>
                        </div>
                        <div class="right">
                            <p><span v-for="(val,index) in order_info.course.teacher" :key="index">{{val.nickname}}</span> </p>
                        </div>
                    </div>
                    <div class="price">
                        <em>￥{{order_info.course.underlined_price}}</em><strong>￥{{order_info.course.price}}</strong>
                    </div>
                </div>
            </div>
            <van-submit-bar button-text="立即购买" @submit="placeOrder" button-type="default" :loading="is_submiting">
                <div class="bottom-order-info">
                    <span>共1项，实付款：</span><strong>￥{{order_info.course.price}}</strong>
                </div>
            </van-submit-bar>
        </div>
        <MyError v-if="has_err"></MyError>
    </div>
</template>

<script>
    import {
        getBuyCourseInfo,
        creadeOrderData
    } from "@/api/order"
    import Address from "./com/address"
    import {
        mapState,
        mapMutations
    } from 'vuex'
    export default {
        name: "Order",
        components: {
            Address
        },
        data() {
            return {
                show_content:false, //进入页面不展示，拿到数据展示
                has_err:false,     //无网络时展示
                order_info: {       //课程数据
                    course: {},
                    addr: {}
                },
                orderAddress: {},  //地址信息
                use_selectAddr: false,  //标记用选择的地址还是从服务器传的地址
                is_submiting: false
            }
        },
        methods: {
            ...mapMutations('path', [
                'CLEAR_ORDER_PATH',
            ]),
            ...mapMutations('order', [
                'CLEAR_ORDER_ADDR',
            ]),
            getOrderInfo() { //根据课程id获取生成订单的课程信息
                let params = {
                    course_id: this.$route.params.courseid
                }
                getBuyCourseInfo(params).then(res => {
                    if (res.status === 1) {
                        this.show_content = true
                        this.order_info = res.data.data;
                        if (!this.use_selectAddr) {
                            this.orderAddress = res.data.data.addr;
                        }
                    }
                }).catch(err => {
                    this.$toast.fail('网络错误，请稍后重试')
                    this.has_err = true
                    throw new Error(err)
                })
            },
            placeOrder() { //下单
                let params = {
                    source: 'h5',
                    payable_amount: this.order_info.course.price,
                    goods_amount: this.order_info.course.price,
                    item: [{
                        id: this.order_info.course.id,
                        goods_type: 'livecourse',
                        goods_amount: this.order_info.course.price
                    }]
                }
                if (this.order_info.course.have_materials === 1) { //有邮寄资料，添加地址
                    params.addr_id = this.orderAddress.id;
                }
                let vm = this
                vm.is_submiting = true
                creadeOrderData(params).then(res => {
                    if (res.status === 1) {
                        this.$router.push(`/payment/${res.data.order_sn}`)
                    }
                }).finally(function() {
                    vm.is_submiting = false;
                })
            }
        },
        computed: {
            ...mapState('order', [
                'orderInfoAddr'
            ]),
        },
        beforeRouteEnter(to, from, next) {
            if (to.params.courseid !== 0 && !to.params.courseid) {
                next('/404')
            } else {
                next((vm) => {
                    vm.CLEAR_ORDER_PATH();
                    if (from.name == 'PayMent') { //从支付页返回时保留原来信息
                        if (JSON.stringify(vm.order_info.course) == "{}") {
                            vm.use_selectAddr = false
                            vm.getOrderInfo();
                        }
                    } else if (from.name == 'EditAddress' || from.name == 'SelectAddress') {  //从选择地址返回时保留信息
                        if (!!vm.orderInfoAddr && vm.orderInfoAddr != "{}") {
                            vm.orderAddress = JSON.parse(vm.orderInfoAddr)
                            vm.use_selectAddr = true
                            vm.CLEAR_ORDER_ADDR();
                        }
                        if (JSON.stringify(vm.order_info.course) == "{}") {
                            vm.getOrderInfo();
                        }
                    } else {
                        vm.use_selectAddr = false
                        vm.getOrderInfo();
                    }
                });
            }
        }
    }
</script>
<style lang="less">
    #confirm-order-wrap {
        background: @bg2Grey;
        padding: 46px 0 52px;
        min-height: 100vh;
        box-sizing: border-box;
        .van-notice-bar {
            font-size: 13px;
            line-height: 1.2em;
        }
        .order-area {
            padding: .373333rem .453333rem 0;
            .add-address-box {
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
                        p span {
                            padding-right: 3px;
                        }
                    }
                }
                .price {
                    text-align: right;
                    font-size: 20px;
                    line-height: 1.2em;
                    em {
                        font-size: 12px;
                        color: @txtBlack;
                        text-decoration: line-through;
                        vertical-align: initial;
                    }
                    strong {
                        font-size: 20px;
                        color: @txtOrange;
                    }
                }
            }
        }
        .van-submit-bar__bar {
            justify-content: space-between;
            .van-button {
                font-size: 16px;
                color: @txtWhite;
                border-radius: 5px;
                background: @gradualOrange;
            }
        }
        .bottom-order-info {
            line-height: 48px;
            font-size: 0;
            span {
                font-size: 13px;
                color: @txtBlack;
                vertical-align: bottom;
            }
            strong {
                font-size: 22px;
                color: @txtOrange;
                vertical-align: middle;
            }
        }
    }
</style>