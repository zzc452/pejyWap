<!-- 第三方登录 -->
<template>
    <div id="third-login">
        <van-divider :style="{ color: '#B0B0B0', borderColor: '#B0B0B0', padding: '0',margin:'0' }">其他方式登录</van-divider>
        <div class="third-btn-box">
            <div class="wchat-login" @click="goWxLogin">
                <img src="../../../assets/img/icon_wechat.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import wechatAuth from '@/plugins/wechatAuth'
    import { mapMutations } from 'vuex'
    export default {
        data() {
            return {}
        },
        methods:{
            async goWxLogin(){
                wechatAuth.redirect_uri = window.location.href.replace(/^(\/login)\/?[^\w]+/,'bindphone');
                await this.setWxLoginStatus(1);
                window.location.href = wechatAuth.authUrl
            },
            ...mapMutations('user', [
                'setWxLoginStatus'
            ]),
        }
    }
</script>
<style scoped lang="less">
    #third-login {
        .van-divider {
            font-size: 12px;
            color: #B0B0B0;
        }
        .third-btn-box {
            display: flex;
            justify-content: space-around;
            flex-wrap: nowrap;
            padding-top: .613333rem;
            div {
                flex: 0 1 1.093333rem;
                cursor: pointer;
                img {
                    width: 100%;
                    display: inline-block;
                    vertical-align: top;
                }
            }
        }
    }
</style>