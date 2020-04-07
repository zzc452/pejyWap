<template>
    <div id="login">
        <span @click.prevent="goLogin">请登录</span> </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        data() {
            return {
            }
        },
        computed:{
            
             ...mapState('user',[
                'userInfo'
            ]),
             ...mapState('path',[
                'loginToPath'
            ]),
        },
        methods:{
            ...mapMutations('user',[
                'SAVE_USER'
            ]),
            ...mapMutations('path',[
                'CLEAR_LOGIN_REDIRECT_PATH'
            ]),
            goLogin(){
                this.SAVE_USER({name:'jone'})
                // this.$router.push(this.loginToPath['path']);
                // this.CLEAR_LOGIN_REDIRECT_PATH('loginToPath');
                
            }
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {
        },
        //生命周期 - 挂载完成（访问DOM元素）
        mounted() {
        }
    }
</script>
<style scoped>
    /* @import url(); 引入css类 */
    #login {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        height: 200px;
    }
</style>