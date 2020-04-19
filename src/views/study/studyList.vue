<!-- 学习列表 -->
<template>
    <div id="study-list-wrap">
        <MyHeader title="免费直播课" :leftArrow="false"></MyHeader>
        <!-- 学习列表 -->
        <div class="study-list-box">
            <div class="top-select-box">
                <van-sticky offset-top="46">
                    <van-tabs v-model="study_status" color="#FF6900" line-height="2" line-width="12" title-active-color="#FF6900" title-inactive-color="#000000">
                        <van-tab title="正在学" name="0" to="/studylist/studystatus/1"></van-tab>
                        <van-tab title="未开始" name="1" to="/studylist/studystatus/2"></van-tab>
                        <van-tab title="已结束" name="2" to="/studylist/studystatus/3"></van-tab>
                    </van-tabs>
                </van-sticky>
            </div>
            <van-notice-bar wrapable :scrollable="false">提示：今日有课</van-notice-bar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                study_status:0
            }
        }
    }
</script>
<style lang="less">
    #study-list-wrap{
        min-height:100vh;
        background: #f1f1f1;
        #public-nav-header {
            .van-nav-bar {
                background: @gradualOrange;
                .van-nav-bar__title {
                    color: @txtWhite;
                }
            }
        }
        .van-notice-bar{
            height: 32px;
            text-align: center;
            font-size: 13px;
            color: #6B3A18;
            padding: 0;
            background: #fef4eb;
            justify-content: center;
        }
    }
</style>