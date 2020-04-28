<!-- 学习列表 -->
<template>
    <div id="study-list-wrap">
        <MyHeader :title="titTxt" :fixed="true"></MyHeader>
        <!-- 学习列表 -->
        <div class="study-list-box">
            <div class="top-select-box">
                <van-sticky offset-top="46">
                    <van-tabs @click="changeStatus" :border="false" v-model="study_status" color="#FF6900" line-height="2" line-width="12" title-active-color="#FF6900" title-inactive-color="#000000">
                        <van-tab title="正在学" name="2"></van-tab>
                        <van-tab title="未开始" name="1"></van-tab>
                        <van-tab title="已结束" name="3"></van-tab>
                    </van-tabs>
                </van-sticky>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                study_status:2
            }
        },
        computed:{
            titTxt(){ //标题
                return this.$route.params.type==2 ? '购买过的课程':'免费直播课'
            },
            pathType(){ //路由课程类型
                return this.$route.params.type==2 ? this.$route.params.type:1
            },
            pathStatus(){ //路由学习阶段
                return this.$route.params.status?this.$route.params.status:1
            }
        },
        methods:{
            changeStatus(name) { //切换学习阶段
                if(name == this.pathStatus) return;
                this.$router.replace(`/studylist/${this.pathType}/studystatus/${name}`)
            },
        },
        created(){ //根据路由重置学习阶段导航
            this.study_status = this.$route.params.status?this.$route.params.status:1
        },
        watch: {
            '$route' () {
                this.study_status = this.$route.params.status?this.$route.params.status:1
            }
        },
    }
</script>
<style lang="less">
    #study-list-wrap{
        min-height:100vh;
        background: @bg2Grey;
        box-sizing: border-box;
        padding-top:46px;
        .top-select-box{
            .van-tab--active{
                font-weight: bold;
            }
            .van-tabs__nav--line{
                padding-bottom: 11px;
            }

        }
    }
</style>