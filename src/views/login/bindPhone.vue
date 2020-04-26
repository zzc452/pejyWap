<!-- 绑定手机 -->
<template>
    <div id="bind-phone-wrap">
        <MyHeader></MyHeader>
        <div class="bind-phone-box">
            <div class="content-phone">
                <div class="top-txt">
                    <h4>绑定手机</h4>
                    <p>为了您账户更加安全，请绑定手机号码，后续也可使用手机号码登录</p>
                </div>
                <van-form validate-first @submit="bindPhone">
                    <van-field v-model="mobile" name="mobile" placeholder="请输入手机号" maxlength="11" type="tel" />
                    <div class="button-box">
                        <van-button :loading="this.isLogining" loading-text="提交中..." :native-type="this.isLogining ? 'button' : 'submit'" block color="linear-gradient(to right, #ff6900, #de5900)">下一步</van-button>
                    </div>
                </van-form>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {
        getMobileCode
    } from '@/api/login.js'
    export default {
        data() {
            return {
                mobile: '',
                isLogining: false,
                scene: 4, //绑定手机
            }
        },
        methods: {
            bindPhone(mobile = this.mobile) {
                let phoneReg = /^1[3456789]\d{9}$/;
                if (!phoneReg.test(this.mobile)) {
                    this.$toast('请输入正确手机号')
                    return;
                }
                let vm = this;
                let params = {
                    mobile: mobile,
                    scene: this.scene
                };
                getMobileCode(params).then(res => {
                    if (res.status === 1) {
                        vm.$router.push('bindphone/code');
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    #bind-phone-wrap {
        #public-nav-header {
            .van-nav-bar {
                background: @bgWhite;
                .van-icon {
                    color: @txt2Black;
                }
            }
        }
        .bind-phone-box {
            position: relative;
            width: 100%;
            box-sizing: border-box;
            padding: 1.066667rem .986667rem 0;
            .top-txt {
                padding-bottom: 1.813333rem;
                h4 {
                    font-size: 24px;
                    color: #333333;
                    margin-bottom: .506667rem;
                }
                p {
                    font-size: 12px;
                    color: #999999;
                }
            }
            .content-phone {
                .van-cell {
                    padding: 15px 0;
                    input {
                        font-size: 17px;
                        color: #000;
                    }
                    &:not(:last-child)::after {
                        left: 0;
                        right: 0;
                    }
                }
                .button-box {
                    padding-top: .693333rem;
                }
            }
        }
    }
</style>