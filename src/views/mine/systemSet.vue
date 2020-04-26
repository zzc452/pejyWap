<!-- 系统设置 -->
<template>
    <div id="system-setting-wrap">
        <MyHeader title="系统设置"></MyHeader>
        <div class="inner-box">
            <div class="menu-list">
                <van-cell is-link to="/changepassword">
                    <div slot="title" class="order">修改密码</div>
                </van-cell>
                <van-cell is-link>
                    <div slot="title" class="setting">版本号1.0.0</div>
                </van-cell>
            </div>
            <MyButton title="退出登录" @click="signOut"></MyButton>    
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods:{
            signOut(){
                let vm = this
                this.$store.dispatch('user/logOut').then(() => {
                    vm.$toast.success('退出成功！')
                    setTimeout(()=>{
                        vm.$router.replace('/login')
                    },1E3)
                })
            }
        }
    }
</script>
<style lang="less">
    #system-setting-wrap {
        min-height: 100vh;
        background: @bg2Grey;
        .inner-box {
            padding: .373333rem .333333rem 0;
            .menu-list {
                background: @bgWhite;
                border-radius: .266667rem;
                overflow: hidden;
                box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.03);
                margin-bottom: .826667rem;
                .van-cell {
                    height: 1.546667rem;
                    line-height: 1.546667rem;
                    padding: 0 .64rem 0 .586667rem;
                    align-items: center;
                    &:not(:last-child)::after {
                        left: .4rem;
                        right: .373333rem;
                    }
                    .van-cell__title {
                        font-size: 16px;
                        color: @txtBlack;
                    }
                }
            }
        }
    }
</style>