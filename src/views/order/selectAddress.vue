<!-- 地址列表 -->
<template>
    <div id="address-list-wrap">
        <MyHeader title="选择地址" :border="true" :fixed="true"></MyHeader>
        <div class="content-box" v-show="show_content">
            <div class="has-address" v-if="data_list.length>0">
                <div class="address-list">
                    <h4>配送地址</h4>
                    <van-divider :style="{ color: '#eeeeee' }" />
                    <van-cell v-for="(val,index) in data_list" :key="index">
                        <div class="info-box" slot="title" @click="useAddress(val)">
                            <h6><span>{{val.receiver}}</span><i>{{val.mobile}}</i>
                                <van-tag v-if="val.is_default === 1" color="#ff6b03" plain>默认</van-tag>
                            </h6>
                            <p>
                                {{val.city_name}}
                            </p>
                        </div>
                        <div class="bnt-box" slot="right-icon" @click="gotoEdite(val.id)">
                            <img src="../../assets/img/btn_edite.png" alt="">
                        </div>
                    </van-cell>
                </div>
                <div class="bottom-btn-box">
                    <router-link tag="button" to="/editaddress"><img src="../../assets/img/icon_pluse.png" alt="">新增配送地址</router-link>
                </div>
            </div>
            <div class="no-address" v-else>
                <img src="../../assets/img/pic_noAddress.png" alt="">
                <p>您还没有收货地址哦~</p>
                <router-link tag="button" to="/editaddress">添加地址</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getAddressList
    } from "@/api/order"
    import {
        mapState,
        mapMutations
    } from 'vuex'
    export default {
        name: "SelectAddress",
        data() {
            return {
                show_content: false,
                data_list: []
            }
        },
        computed: {
            ...mapState('path', [
                'orderToPath'
            ]),
        },
        methods: {
            ...mapMutations('order', [
                'SET_ORDER_ADDR'
            ]),
            gotoEdite(id) {
                this.$router.push({
                    path: `/editaddress/${id}`
                })
            },
            useAddress(val) {
                let addr = {
                    address: val.address,
                    id: val.id,
                    is_default: val.is_default,
                    mobile: val.mobile,
                    area: val.province + val.city + val.district,
                    receiver: val.receiver,
                }
                this.SET_ORDER_ADDR(addr)
                this.$router.replace(decodeURI(this.orderToPath))
            },
            initData() {
                let vm = this
                getAddressList().then(res => {
                    if (res.status === 1) {
                        this.data_list = res.data.data;
                    }
                }).catch(err => {
                    vm.$toast.fail('网络错误，请稍后重试');
                    throw new Error(err)
                }).finally(() => {
                    vm.show_content = true;
                })
            }
        },
        created() {
            this.initData()
        }
    }
</script>
<style scoped lang="less">
    #address-list-wrap {
        background: #f2f2f2;
        min-height: 100vh;
        box-sizing: border-box;
        padding: 46px .453333rem 78px;
        .has-address {
            .address-list {
                background: @bgWhite;
                padding: .426667rem .453333rem;
                margin-top: .4rem;
                border-radius: 10px;
                h4 {
                    font-size: 15px;
                    color: @txtBlack;
                    margin-bottom: .373333rem;
                }
                .van-divider {
                    margin: 0;
                }
                .van-cell {
                    padding: 10px 0;
                    .info-box {
                        cursor: pointer;
                        h6 {
                            font-size: 14px;
                            color: @txtBlack;
                            font-weight: normal;
                            margin-bottom: 4px;
                            i {
                                padding-right: .24rem;
                                padding-left: 8px;
                                vertical-align: middle;
                            }
                            span {
                                vertical-align: middle;
                            }
                        }
                        p {
                            font-size: 13px;
                            color: @txtGrey;
                            line-height: 1.4em;
                        }
                    }
                    .bnt-box {
                        flex: 0 0 38px;
                        text-align: center;
                        height: 38px;
                        align-self: center;
                        cursor: pointer;
                        img {
                            width: 18px;
                            height: 18px;
                            margin-top: 10px;
                        }
                    }
                }
            }
            .bottom-btn-box {
                position: fixed;
                bottom: 0;
                padding: 12px 0.453333rem 12px 0.453333rem;
                left: 0;
                right: 0;
                background: @bgWhite;
                font-size: 0;
                button {
                    height: 44px;
                    line-height: 42px;
                    text-align: center;
                    font-size: 16px;
                    color: @txtWhite;
                    width: 100%;
                    border: 0;
                    outline: none;
                    background: linear-gradient(to right, #ff6900, #de5900);
                    cursor: pointer;
                    border-radius: 5px;
                    img {
                        vertical-align: top;
                        width: 18px;
                        height: auto;
                        display: inline-block;
                        margin-right: 10px;
                        margin-top: 13px;
                    }
                }
            }
        }
        .no-address {
            padding-top: 2.4rem;
            text-align: center;
            font-size: 12px;
            color: @txtGrey;
            img {
                width: 4rem;
                height: auto;
                display: inline-block;
            }
            p {
                padding: .533333rem 0 1.066667rem;
            }
            button {
                width: 110px;
                height: 38px;
                line-height: 38px;
                font-size: 16px;
                color: @txtWhite;
                background: @gradualOrange;
                border: 0;
                outline: none;
                border-radius: 3px;
            }
        }
    }
</style>