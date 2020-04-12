<!-- 绑定手机 验证码 -->
<template>
    <div id="phone-code">
        <!-- 密码输入框 -->
        <div class="top-txt">
            <h4>输入短信验证码</h4>
            <p>验证码已发送到您的手机 {{mobile}}</p>
        </div>
        <div class="input-code">
            <div class="txt-box">
                <p class="tip">4位数字验证码</p>
                <div v-show="!is_countDown" class="btn-code" @click="getBindCode">重新获取</div>
                <van-count-down v-show="is_countDown" :auto-start="false" ref="countDown" :time="countdown_time" format="ss 秒" @finish="countDownFinish" />
            </div>
            <div class="code-box">
                <input type="tel" maxlength="4" @input="beginBind" @focus="isFocus=true" @blur="isFocus=false" v-model="code">
                <van-password-input :value="code" :mask="false" :length="4" :gutter="5" :focused="isFocus" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                code: '',
                mobile: this.$parent.mobile,
                isFocus: false,
                is_countDown: false,
                countdown_time: 60 * 1000,
            };
        },
        methods: {
            countDownFinish() {
                this.is_countDown = false;
                this.$refs.countDown.reset()
            },
            beginCountDown() {
                this.is_countDown = true;
                this.$refs.countDown.start();
            },
            beginBind() {
                if (this.code && this.code.length == 4) {
                    this.$toast('开始提交')
                }
            },
            getBindCode() {
                this.beginCountDown();
                this.$parent.bindPhone(this.mobile);
            }
        },
        mounted() {
            
            this.beginCountDown();
        },
    };
</script>
<style lang="less">
    #phone-code {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        padding: 1.066667rem 0.986667rem 0;
        box-sizing: border-box;
        background: #fff;
        padding-bottom: 160px;
        .input-code {
             width: 226px;
                margin: 0 auto;
            .txt-box {
                width: 100%;
                display: flex;
                justify-content: space-between;
                flex-wrap: nowrap;
                margin-bottom: .453333rem;
                .tip {
                    font-size: 12px;
                    color: #CCCCCC;
                }
                .btn-code {
                    font-size: 13px;
                    color: #000;
                    cursor: pointer;
                }
                .van-count-down {
                    font-size: 13px;
                    color: #417DDB;
                }
            }
            .code-box {
                width: 100%;
                height: 52px;
                position: relative;
                input[type="tel"] {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 2;
                    border: 0;
                    outline: none;
                    opacity: 0;
                }
                .van-password-input {
                    margin: 0;
                    li {
                        border: 1px solid #989898;
                        border-radius: 5px; // &:has(> div){
                        //     border-color:#3076bc;
                        // }
                        .van-password-input__cursor {
                            background: #3076bc;
                            width: 2px;
                        }
                    }
                }
            }
        }
    }
</style>