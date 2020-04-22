<!-- 添加地址组件 -->
<template>
    <div>
        <div class="add-address-box" @click="gotoAdd" v-if="isEpmtyObj(orderAddr)">
            <div class="left">
                <img src="../../../assets/img/icon_address.png" alt="">
            </div>
            <div class="right">
                <div class="goto-add">
                    <h4>添加收货地址</h4>
                    <p>用于邮寄学习资料或学习工具</p>
                </div>
            </div>
        </div>
        <div class="add-address-box" @click="gotoSelect" v-else>
            <div class="left">
                <img src="../../../assets/img/icon_address.png" alt="">
            </div>
            <div class="right">
                <div class="has-default">
                    <p>
                        <van-tag color="#ff6900" v-if="orderAddr.is_default == 1">默认</van-tag>{{orderAddr.area?orderAddr.area: orderAddr.province + orderAddr.city + orderAddr.district}}</p>
                    <h4>{{orderAddr.address}}</h4>
                    <p>{{orderAddr.receiver}}<em>{{orderAddr.mobile | hideMobile()}}</em></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapMutations
    } from 'vuex'
    export default {
        name: "Address",
        props: {
            orderAddr: {
                type: Object
            }
        },
        data() {
            return {}
        },
        methods: {
            ...mapMutations('path', [
                'SAVE_ORDER_PATH'
            ]),
            gotoAdd() {
                this.savePath()
                this.$router.push('/editaddress')
            },
            gotoSelect() {
                this.savePath()
                this.$router.push('/selectAddress')
            },
            savePath() {
                this.SAVE_ORDER_PATH(this.$route.fullPath)
            },
            isEpmtyObj(obj) {
                for (var key in obj) {
                    return false;
                }
                return true;
            }
        },
        filters:{
            hideMobile(val){
                return val.substr(0,3)+"****"+val.substr(7);
            }
            
        }
    }
</script>
<style scoped lang="less">
    @imgUrl: '../../../assets/img/';
    .add-address-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: @bgWhite;
        width: 100%;
        box-sizing: border-box;
        padding: .613333rem .666667rem .613333rem 0;
        box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.03);
        cursor: pointer;
        border-radius: .133333rem;
        .left {
            flex: 0 0 1.573333rem;
            text-align: center;
            height: .8rem;
            img {
                display: inline-block;
                width: .8rem;
                height: .8rem;
                vertical-align: top;
            }
        }
        .right {
            padding-right: .32rem;
            background: url("@{imgUrl}icon_addressPointer.png") right center no-repeat;
            background-size: .213333rem auto;
            flex: 1 1 auto;
            .goto-add {
                h4 {
                    font-size: 16px;
                    color: @txtBlack;
                    margin-bottom: 4px;
                }
                p {
                    font-size: 12px;
                    color: @txtGrey;
                }
            }
            .has-default {
                color: @txtBlack;
                p {
                    font-size: 12px;
                    .van-tag{
                        margin-right: 8px;
                    }
                    em{
                        padding-left: 10px;
                    }
                }
                h4 {
                    font-size: 16px;
                    padding: 4px 0;
                }
            }
        }
    }
</style>