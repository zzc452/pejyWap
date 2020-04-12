<!-- 快捷登录 -->
<template>
    <div id="account-login">
        <van-form validate-first @submit="beginLogin">
            <div class="input-box borderBottom">
                <van-field v-model="mobile" placeholder="请输入手机号" maxlength="11" type="number" />
                <span class="btn-clear" @click="clearPhone" v-show="show_btnClaer"></span>
            </div>
            <div class="input-box borderBottom">
                <van-field v-model="password" name="code" placeholder="请输入密码" :type="passwordTotext? 'text' : 'password'" />
                <span :class="[{'show-eye':passwordTotext},'btn-showpassword']" @click="showPassword"></span>
            </div>
            <div class="link-box">
                <van-cell title="" value="忘记密码" url="/forgotpassword" />
                <van-cell @click="$emit('changeLogin')" title="" value="切换验证码登录" is-link />
            </div>
            <LoginBtn :can_submie="this.can_submie" :isLogining="this.isLogining"></LoginBtn>
        </van-form>
    </div>
</template>

<script>
    import {
        accountLogin
    } from '@/api/login.js'
    import LoginBtn from './loginBtn'
    export default {
        data() {
            return {
                mobile: "",
                password: "",
                isLogining: false,
                passwordTotext: false,
                show_btnClaer: false
            };
        },
        components: {
            LoginBtn
        },
        computed: {
            can_submie() {
                return this.mobile.length > 0 && this.password.length > 0;
            }
        },
        watch: {
            mobile(val) {
                this.show_btnClaer = val.length > 0;
            }
        },
        methods: {
            clearPhone() {
                this.mobile = '';
            },
            showPassword() {
                this.passwordTotext = !this.passwordTotext;
            },
            beginLogin() {
                let vm = this;
                if (!this.$parent.isPhoneNumber(this.mobile)) {
                    this.$toast('请输入正确手机号')
                    return;
                }
                if (this.password.length == 0) {
                    this.$toast('请输入密码')
                    return;
                }
                if (!this.$parent.$data.isAgree) {
                    this.$toast('请同意用户协议')
                    return;
                }
                this.isLogining = true;
                let params = {
                    mobile: this.mobile,
                    password: this.password,
                }
                accountLogin(params).then(res => {
                    vm.$emit('loginResult', res)
                }).catch(err => {
                    throw new Error(err)
                }).finally(function() {
                    vm.isLogining = false;
                })
            },
            changeLoginType() {
                this.$parent.$data.quick_login = !this.$parent.$data.quick_login;
            }
        }
    };
</script>
<style lang="less">
    #account-login {
        padding-top: .32rem;
        .borderBottom {
            border-bottom: 1px solid #C6C6C6;
            position: relative;
            .btn-clear {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .453333rem;
                height: .453333rem;
                background: url("../../../assets/img/icon_clear.png") 0 0 no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
            }
            .btn-showpassword {
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .426667rem;
                height: .266667rem;
                background: url("../../../assets/img/icon_eye1.png") 0 0 no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
                &.show-eye {
                    background: url("../../../assets/img/icon_eye2.png") 0 0 no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
        .van-cell {
            padding: 15px 0;
            input {
                font-size: 17px;
                color: #000;
            }
        }
        .link-box {
            padding: .853333rem 0 1.066667rem;
            display: flex;
            justify-content: space-between;
            div {
                flex: 0 1 auto;
                font-size: 13px;
                color: #666666;
                padding: 0;
                width: auto;
            }
            .van-cell--clickable:active {
                background: none;
            }
        }
    }
</style>