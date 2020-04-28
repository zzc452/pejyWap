<!-- 快捷登录 -->
<template>
    <div id="quick-login">
        <van-form validate-first @submit="beginLogin">
            <van-field v-model="mobile" name="mobile" placeholder="请输入手机号" maxlength="11" type="tel" :border="true" />
            <van-field v-model="code" name="code" placeholder="请输入验证码" maxlength="4" type="number">
                <div slot="button" class="right-area">
                    <span @click="getCode" v-show="!is_countDown">获取验证码</span>
                    <van-count-down v-show="is_countDown" :auto-start="false" ref="countDown" :time="countdown_time" format="ss 秒" @finish="countDownFinish" />
                </div>
            </van-field>
            <div class="attention-box">
                <p>首次验证码登陆完成后，即注册成功</p>
                <van-cell @click="$emit('changeLogin')" title="" value="切换密码登录" is-link />
            </div>
            <LoginBtn :can_submie="this.can_submie" :isLogining="this.isLogining"></LoginBtn>
        </van-form>
    </div>
</template>

<script>
    import {
        getMobileCode,
        quickLogin
    } from '@/api/login.js'
    import LoginBtn from './loginBtn'
    export default {
        data() {
            return {
                mobile: "",
                code: "",
                scene: 2, //登录
                countdown_time: 60 * 1000,
                is_countDown: false,
                isLogining: false,
                source: "h5"
            };
        },
        components: {
            LoginBtn
        },
        computed: {
            can_submie() {
                return this.mobile.length > 0 && this.code.length > 0;
            },
        },
        methods: {
            getCode() { //获取验证码
                if (!this.$parent.isPhoneNumber(this.mobile)) {
                    this.$toast('请输入正确手机号')
                    return;
                }
                let params = {
                    mobile: this.mobile,
                    scene: this.scene
                };
                getMobileCode(params).then(res => {
                    if(res.status === 1){
                        this.is_countDown = true;
                        this.$refs.countDown.start();
                    }
                    console.log(res)
                }).catch(err => {
                    this.$toast('网络错误请稍后重试')
                    throw new Error(err);
                });
            },
            countDownFinish() {
                this.is_countDown = false;
                this.$refs.countDown.reset()
            },
            beginLogin() { //快捷登录
                let vm = this;
                if (!this.$parent.isPhoneNumber(this.mobile)) {
                    this.$toast('请输入正确手机号')
                    return;
                }
                if (this.code.length !== 4) {
                    this.$toast('请输入四位手机验证码')
                    return;
                }
                if (!this.$parent.$data.isAgree) {
                    this.$toast('请勾选用户协议')
                    return;
                }
                this.isLogining = true;
                let params = {
                    mobile: this.mobile,
                    code: this.code,
                    source: this.source
                };
                quickLogin(params).then((res) => {
                    vm.$emit('loginResult', res)
                }).catch(err => {
                    this.$toast('网络错误请稍后重试')
                    throw new Error(err);
                }).finally(function() {
                    vm.isLogining = false;
                })
            }
        }
    };
</script>
<style lang="less">
    #quick-login {
        padding-top: .426667rem;
        .van-cell {
            padding: 14px 0;
            input {
                font-size: 17px;
                color: #000;
            }
            .right-area {
                width: 98px;
                text-align: center;
                flex: 0 1 98px;
                span {
                    font-size: 16px;
                    color: #000;
                    cursor: pointer;
                    display: block;
                    line-height: 20px;
                }
            }
            &:not(:last-child)::after {
                left: 0;
                right: 0;
            }
        }
        .attention-box {
            padding: 10px 0 1.066667rem;
            height: 50px;
            p {
                font-size: 12px;
                color: #999999;
                margin-bottom: 10px;
            }
            div {
                font-size: 13px;
                color: #666666;
                padding: 0;
            }
            .van-cell--clickable:active {
                background: none;
            }
        }
    }
</style>