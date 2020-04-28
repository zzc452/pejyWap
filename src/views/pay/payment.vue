<!-- 支付页面 -->
<template>
    <div id="payment-wrap">
        <MyHeader title="订单支付"></MyHeader>
        <div class="content-box" v-show="show_content">
            <div class="pay-info-box">
                <div class="payment-info">
                    <div class="price">
                        <strong>￥{{order_info.payable_amount}}</strong>
                    </div>
                    <div class="time-down">
                        支付倒计时：
                        <van-count-down :time="countdown_time" format=" HH : mm : ss " />
                    </div>
                    <p class="pay-order">订单号：{{order_info.order_sn}}</p>
                </div>
                <div class="pay-style">
                    <h6>选择支付方式</h6>
                    <van-divider :style="{  borderColor: '#ebedf0', margin: '0 0' }" />
                    <van-radio-group v-model="pay_style">
                        <van-cell clickable @click="pay_style = '1'">
                            <div slot="title" class="pay-item">
                                <img src="@/assets/img/icon_payAli.png" alt="">支付宝
                            </div>
                            <template #right-icon>
                                    <van-radio checked-color="#ff6900" icon-size="16px" name="1" />
                            </template>
                        </van-cell>
                        <van-cell clickable @click="pay_style = '2'">
                            <div slot="title" class="pay-item">
                                <img src="@/assets/img/icon_payWechat.png" alt="">微信
                            </div>
                            <template #right-icon>
                                <van-radio checked-color="#ff6900" icon-size="16px" name="2" />
                            </template>
                        </van-cell>
                    
                    </van-radio-group>
                    
                </div>
            </div>
            <div class="bottom-btn-box">
                <MyButton title="立即支付" @click="gotoPay" />
            </div>
            <van-overlay :show="guid_browser" @click="guid_browser = false">
                <div class="guid-pic">
                    <img src="@/assets/img/guid_browser.png" alt="">
                </div>
                </van-overlay>   
        </div> 
        <MyError v-if="has_err"></MyError> 
    </div>
</template>

<script>
    import { getOrderInfo,payOrder } from "@/api/order"
    export default {
        data() {
            return {
                show_content:false,
                has_err:false,
                order_info:{},
                countdown_time: 0,
                pay_style: '1',
                guid_browser:false
            }
        },
        computed:{
            payCode(){
                return this.pay_style == 1? 'Alipay':'Wechat'
            }
        },
        methods:{
            initData(){
                let sn = this.$route.params.sn;
                if(sn===0 || !!sn){
                    getOrderInfo({order_sn:sn}).then(res=>{
                        if(res.status === 1){
                            this.show_content = true
                            this.order_info = res.data.info;
                            this.countdown_time = res.data.info.time*1000
                        }
                    }).catch(err=>{
                        this.$toast.fail('网络错误，请稍后重试')
                        this.has_err = true
                        throw new Error(err)
                    })
                }
            },
            gotoPay(){
                if(this.$store.getters.isWechat){ // 微信浏览器
                    if(this.payCode === 'Alipay'){ 
                        this.guid_browser = true
                    }else{
                        alert('sdk支付')
                    }
                }else{ //非微信浏览器
                    let params={
                        order_sn:this.$route.params.sn,
                        source:'h5',
                        pay_code:this.payCode
                    }
                    payOrder(params).then(res=>{
                        if(this.payCode === 'Alipay'){
                            this.deleteDom('#alipay');
                            const div = document.createElement('div');
                            div.id = 'alipay';
                            div.innerHTML = res;
                            document.body.appendChild(div);
                            document.querySelector('#alipay').children[0].submit();
                        }else{
                            console.log(123)
                        }
                    })
                }

                
            },
            deleteDom(id){
                if(document.querySelector(id)){
                    document.body.removeChild(document.querySelector(id))
                }
            }
        },
        created() {
            this.initData();
        },
        beforeRouteEnter(to,from,next){
            if(to.params.sn ===0 || !!to.params.sn){
                next()
            }else{
                next('/404')
            }
        }
    }
</script>
<style lang="less">
    #payment-wrap {
        min-height: 100vh;
        background: @bg2Grey;
        padding-bottom: 54px;
        box-sizing: border-box;
        .pay-info-box {
            padding: .56rem .466667rem;
            .payment-info {
                text-align: center;
                color: @txt2Black;
                line-height: 32px;
                strong {
                    font-size: 30px;
                    color: @txtOrange;
                }
                .time-down {
                    vertical-align: top;
                    height: 28px;
                    line-height: 28px;
                    padding: 0 20px;
                    border-radius: 14px;
                    display: inline-block;
                    font-size: 12px;
                    margin: .266667rem auto;
                    background: @txtWhite;
                    color: @txtBlack;
                    .van-count-down {
                        display: inline;
                        font-size: 12px;
                    }
                }
                p.pay-order {
                    font-size: 12px;
                    line-height: 1.2em;
                    margin-bottom: .506667rem;
                }
            }
        }
        .pay-style {
            background: @bgWhite;
            border-radius: .32rem;
            overflow: hidden;
            box-shadow: 2px 1px 5px 0px rgba(0, 0, 0, 0.03);
            h6 {
                font-size: 16px;
                color: @txtBlack;
                line-height: 1.2em;
                padding: .48rem;
            }
            .van-cell{
                padding: .48rem .506667rem;
            }
            .van-cell:not(:last-child)::after{
                left: 0;
            }
            .pay-item {
                font-size: 14px;
                color: @txtBlack;
                img {
                    width: .733333rem;
                    height: auto;
                    margin-right: .4rem;
                }
            }
        }
        .bottom-btn-box {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            background: @bgWhite;
            padding: 8px .466667rem 6px;
            button {
                height: 40px;
                line-height: 40px;
            }
        }
        .guid-pic{
            position: absolute;
            right: 0.58rem;
            width: 6.4rem;
            top:  0.5rem;
            img{
                width: 100%;
            }
        }
    }
</style>