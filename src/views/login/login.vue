<template>
    <div id="login-wrap">
        <div class="login-top">
            <span class="btn-close" @click="cancelLogin"></span>
            <div class="logo-img">
                <img src="../../assets/img/logo.png" alt="">
            </div>
        </div>
        <QuickLogin v-if="quick_login" @loginResult="loginOperate" @changeLogin="changeLoginType"></QuickLogin>
        <AccountLogin v-if="!quick_login"  @loginResult="loginOperate" @changeLogin="changeLoginType"></AccountLogin>
        <div class="agreement-box">
            <van-checkbox  v-model="isAgree" shape="square"><span>登录即代表阅读并同意<router-link tag="a" to="/agreement">《服务协议和隐私政策》</router-link></span></van-checkbox>
        </div>
        <thirdLogin v-if="isWechat"></thirdLogin>
    </div>
</template>

<script>
    
    import thirdLogin from './com/thirdLogin'
    import QuickLogin from './com/quickLogin'
    import AccountLogin from './com/accountLogin'
    import { mapState,mapMutations } from 'vuex'
    export default {
        data() {
            return {
                isAgree:true,
                quick_login:true,
                isWeChat:false
            }
        },
        components: {
            thirdLogin,
            QuickLogin,
            AccountLogin
        },
        methods: {
            cancelLogin(){
                window.history.length>1?this.$router.go(-1):this.$router.push('/');
            },
            isPhoneNumber(mobile){
                let phoneReg = /^1[3456789]\d{9}$/;
                return phoneReg.test(mobile);
            },
            loginOperate(res){//登录结果操作
                if(res.status == 1){
                    this.$toast('登录成功');
                    this.SAVE_USER(res.data.data);
                    if(res.data.grade == 0){
                        this.$router.push('/selectgrade'); //绑定年级
                    }else{
                        this.$router.push(this.loginToPath);
                    }
                }else{
                    this.$toast(res.message);
                }
            },
            changeLoginType(){
                this.quick_login = !this.quick_login;
            },
            ...mapMutations('user', [
                'SAVE_USER'
            ]),
            ...mapMutations('path', [
                'SAVE_BROWSER'
            ]),
            whetherEeChat(){
                let ua = navigator.userAgent.toLowerCase();
                if (String(ua.match(/MicroMessenger/i)) === 'micromessenger') {
                    this.isWechat = true;
                    
                } else {
                    this.isWechat = false;
                }
                this.SAVE_BROWSER(this.isWechat);
            },
        },
        computed:{
            ...mapState('path',[
                'loginToPath'
            ])
        },
        created(){
            this.whetherEeChat();
        },
    }
</script>
<style lang="less">
    #login-wrap {
        padding: 1.813333rem .986667rem 0;
        box-sizing: border-box;
        position: relative;
        width: 100%;
        .login-top {
            .btn-close {
                position: absolute;
                right: .52rem;
                top: .52rem;
                width: .466667rem;
                height: .466667rem;
                background: url('../../assets/img/icon_close.png');
                background-size: cover;
                cursor: pointer;
            }
            .logo-img {
                height: 1.266667rem;
                img {
                    display: block;
                    height: 100%;
                }
            }
        }
           
        .agreement-box{
            padding-top: .56rem;
            margin-bottom:1.413333rem;
            width: 100%;
            font-size: 12px;
            color: #666666;
            a{
                color: #FF6900;
                text-decoration: none;
            }
            .van-checkbox{
                overflow: unset;
            }
            .van-checkbox__icon .van-icon{
                width:.506667rem;
                height:.506667rem;
                background:url('../../assets/img/icon_select1.png') center no-repeat;
                background-size: contain;
                border:0;
            }
            .van-checkbox__icon--checked .van-icon-success{
                background: none;
                &::before{
                    content:'';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width:.506667rem;
                    height:.506667rem;
                    background: url('../../assets/img/icon_select1_on.png') center no-repeat;
                    background-size: contain;
                }
            }
        }
    }
</style>