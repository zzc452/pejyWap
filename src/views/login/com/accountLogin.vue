<!-- 快捷登录 -->
<template>
    <div id="account-login">
        <van-form validate-first @submit="beginLogin">
            <van-field v-model="mobile" placeholder="请输入手机号" maxlength="11" type="tel" clearable/>
            <van-field v-model="password" name="code" placeholder="请输入密码" :type="passwordTotext? 'text' : 'password'">
                <span slot="right-icon" :class="[{'show-eye':passwordTotext},'btn-showpassword']" @click="showPassword"></span>
            </van-field>
            <div class="link-box">
                <van-cell :border="false" value="忘记密码" url="/forgotpassword" />
                <van-cell :border="false" @click="$emit('changeLogin')" value="切换验证码登录" is-link />
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
        methods: {
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
                    this.$toast('请勾选用户协议')
                    return;
                }
                this.isLogining = true;
                let params = {
                    mobile: this.mobile,
                    password: this.password
                }
                accountLogin(params).then(res => {
                    vm.$emit('loginResult', res)
                }).catch(err => {
                    this.$toast('网络错误请稍后重试')
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
        padding-top: .426667rem;
        .van-cell {
            padding: 14px 0;
            input {
                font-size: 17px;
                color: #000;
            }
            &:not(:last-child)::after {
                left: 0;
                right: 0;
            }
            .btn-showpassword {
                display: inline-block;
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
        .link-box {
            padding: 10px 0 1.066667rem;
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            div {
                flex: 0 1 auto;
                font-size: 13px;
                color: #666666;
                padding: 0;
                width: auto;
                align-items: center;
            }
            .van-cell--clickable:active {
                background: none;
            }
        }
    }
</style>