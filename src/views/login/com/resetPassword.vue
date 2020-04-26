
<!-- 重置密码模块--找回密码和修改密码共用 -->
<template>
    <div class="reset-password-box">
        <van-form validate-first @submit="resetPassword">
            <div class="input-wrap">
                <van-field v-model="mobile" name="mobile" placeholder="请输入手机号" maxlength="11" type="tel" />
                <van-field v-model="code" name="code" placeholder="请输入验证码" maxlength="4" type="number">
                    <div slot="button" class="right-area">
                        <span @click="getCode" v-show="!is_countDown">获取验证码</span>
                        <van-count-down v-show="is_countDown" :auto-start="false" ref="countDown" :time="countdown_time" format="ss 秒" @finish="countDownFinish" />
                    </div>
                </van-field>
                <van-field v-model="password" name="password" placeholder="请设置您的密码（6-16数字或字母）" maxlength="16" type="password" />
                <van-field v-model="repassword" name="repassword" placeholder="请再次输入密码" maxlength="16" type="password" />
                <div></div>
            </div>
            <MyButton :isLogining="this.isLogining" title="确定"></MyButton>
        </van-form>
    </div>
</template>

<script>
    import {
        getMobileCode,
        passRepassword
    } from "@/api/login.js";
    export default {
        name: 'ResetPassword',
        props:{
            kind:{
                type:String,
                default:'forget'
            }
        },
        data() {
            return {
                mobile: "",
                code: "",
                password: "",
                repassword: "",
                countdown_time: 60 * 1000,
                is_countDown: false,
                isLogining: false
            };
        },
        computed:{
            scene(){
                return this.kind == 'forget'?3:4
            }
        },
        methods: {
            checkoutPhone() {
                return /^1[3456789]\d{9}$/.test(this.mobile);
            },
            getCode() {
                if (!this.checkoutPhone()) {
                    this.$toast("请输入正确手机号");
                    return;
                }
                this.is_countDown = true;
                this.$refs.countDown.start();
                let params = {
                    mobile: this.mobile,
                    scene: this.scene
                };
                getMobileCode(params).catch(err => {
                    this.$toast.fail("网络错误请稍后重试");
                    throw new Error(err);
                });
            },
            countDownFinish() {
                this.is_countDown = false;
                this.$refs.countDown.reset();
            },
            resetPassword() {
                let vm = this;
                if (!this.checkoutPhone()) {
                    this.$toast("请输入正确手机号");
                    return;
                }
                if (this.code.length !== 4) {
                    this.$toast("请输入四位手机验证码");
                    return;
                }
                if (this.password.length < 6) {
                    this.$toast("请输入6-16位密码");
                    return;
                }
                if (this.repassword.length < 6) {
                    this.$toast("请再次输入6-16位密码");
                    return;
                }
                this.isLogining = true;
                let params = {
                    mobile: this.mobile,
                    code: this.code,
                    password: this.password,
                    password_confirmation: this.repassword
                };
                passRepassword(params)
                    .then(res => {
                        if (res.status == 1) {
                            if(this.kind=="forget"){
                                this.$toast.success("重置成功，跳转登录");
                                setTimeout(function() {
                                    vm.$router.push({
                                        path: "login",
                                        query: {
                                            type: "accountlogin"
                                        }
                                    });
                                }, 1e3);
                            }else{
                                this.$toast("重置成功!");
                                setTimeout(function() {
                                    vm.$router.replace('/systemset');
                                }, 1e3);
                            }
                            
                        }
                    })
                    .catch(err => {
                        this.$toast("网络错误请稍后重试");
                        throw new Error(err);
                    })
                    .finally(function() {
                        vm.isLogining = false;
                    });
            }
        }
    };
</script>
<style lang="less">
    .reset-password-box {
        padding: 0.826667rem 1rem 0;
        .input-wrap {
            margin-bottom: 2.24rem;
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
                &:nth-child(2)::after {
                    left: 0;
                    right: 98px;
                }
                .right-area {
                    width: 98px;
                    text-align: center;
                    flex: 0 1 98px;
                    span {
                        font-size: 16px;
                        color: #fe6800;
                        cursor: pointer;
                        display: block;
                        line-height: 20px;
                    }
                }
            }
            .van-cell:not(:last-child)::after{
                border-color: #EAEAEA;
            }
        }
        .van-button--normal{
            font-size: 18px;
        }
    }
</style>