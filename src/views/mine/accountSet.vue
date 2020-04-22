<!-- 账户设置 -->
<template>
    <div id="account-setting-wrap">
        <MyHeader title="账户设置" :border="true"></MyHeader>
        <div class="account-body">
            <div class="account-user">
                <div class="pic"><img src="../../assets/img/error.jpg" alt=""></div>
                <van-field v-model="name" maxlength="4" center readonly><span slot="right-icon" class="pen"></span></van-field>
            </div>
            <div class="input-area">
                <van-field label="性别" v-model="sex" center  input-align="right" is-link readonly />
                <van-field label="电话号码" v-model="mobile" center  input-align="right" :clickable="true" readonly>
                    <i slot="right-icon" class="icon-lock"></i>
                </van-field>
                <van-field label="学习阶段" v-model="period" center  input-align="right" is-link readonly />
                <van-field label="学科" v-model="subject" center  input-align="right" is-link readonly />
            </div>
            <div class="bottom-btn-box">
                <MyButton title="保存"></MyButton>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name:'李某某',
                sex: '男',
                mobile: 18303831972,
                period: '初中 初一',
                subject: '英语'
            }
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {},
        //生命周期 - 挂载完成（访问DOM元素）
        mounted() {}
    }
</script>
<style lang="less">
    @imgUrl:"../../assets/img/";
    #account-setting-wrap {
        min-height: 100vh;
        box-sizing: border-box;
        background: @bg2Grey;
        .account-body{
            padding: 0 .333333rem;
            .account-user{
                padding: .72rem 0;
                text-align: center;
                .pic{
                    width: 1.946667rem;
                    height: 1.946667rem;
                    margin: 0 auto;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .van-cell {
                    padding: 0;
                    background: none;
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    width: auto;
                    margin-top: -2px;
                    .van-field__control{
                        width: 72px;
                        text-align: center;
                    }
                    .pen{
                        display: inline-block;
                        width: .453333rem;
                    }
                    .van-field__right-icon{
                        margin-right: 0;
                        padding:0;
                            background: url("@{imgUrl}icon_pen.png") center no-repeat;
                        background-size: .426667rem auto;
                    }
                }
            }
            .input-area{
                background: @bgWhite;
                border-radius: .333333rem;
                overflow: hidden;
                .van-cell{
                    height: 1.306667rem;
                    line-height: 1.306667rem;
                    padding: 0 .346667rem;
                    &:not(:last-child)::after{
                        left:.333333rem;
                        right:.333333rem;
                    }
                    .van-cell__title{
                        font-size: 15px;
                        color: @txtBlack;
                    }
                    .van-field__control{
                        font-size: 15px;
                        color: @txtGrey;
                    }
                    .icon-lock{
                        display: inline-block;
                        width: .373333rem;
                        height:.453333rem;
                        background: url("@{imgUrl}icon_lock.png") 0 center no-repeat;
                        background-size: 100% auto;
                        vertical-align: middle;
                        margin-top: -2px;
                    }
                }
            }
            .bottom-btn-box{
                padding-top: 1.093333rem;
                button{
                    font-size: 18px;
                }
            }
        }
    }
</style>