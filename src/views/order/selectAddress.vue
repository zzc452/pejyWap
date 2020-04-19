<!-- 地址列表 -->
<template>
    <div id="address-list-wrap">
        <MyHeader title="选择地址" :border="true" :fixed="true"></MyHeader>
        <div class="address-list">
            <h4>配送地址</h4>
            <van-divider :style="{ color: '#eeeeee' }" />
            <van-cell v-for="(val,index) in data_list" :key="index">
                <div class="info-box" slot="title">
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
            <!-- <button><img src="../../assets/img/icon_pluse.png" alt="">新增配送地址</button> -->
        </div>
    </div>
</template>

<script>
    import { getAddressList } from "@/api/order"
    export default {
        name:"SelectAddress",
        data() {
            return {
                data_list:""
            }
        },
        methods:{
            gotoEdite(id){
                this.$router.push({ path: `/editaddress/${id}` })
            }
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {
            getAddressList().then(res=>{
                if(res.status === 1){
                    this.data_list = res.data.data;
                }
            })
        }
    }
</script>
<style scoped lang="less">
    #address-list-wrap {
        background: #f2f2f2;
        min-height: 100vh;
        box-sizing: border-box;
        padding: 46px .453333rem 78px;
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
            .van-divider{
                margin:0;
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
        .bottom-btn-box{
            position: fixed;
            bottom: 0;
            padding: 12px 0.453333rem 12px 0.453333rem;
            left: 0;
            right: 0;
            background: @bgWhite;
            font-size: 0;
            button{
                height: 44px;
                line-height: 42px;
                text-align: center;
                font-size: 16px;
                color: @txtWhite;
                width: 100%;
                border:0;
                outline: none;
                background: linear-gradient(to right, #ff6900, #de5900);
                cursor: pointer;
                border-radius: 5px;
                img{
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
</style>