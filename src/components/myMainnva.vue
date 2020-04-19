<!-- 主导航 -->
<template>
    <div>
        <van-tabbar route>
            <van-tabbar-item replace to="/home" icon="home-o">
                选课
            </van-tabbar-item>
            <van-tabbar-item replace to="/video" icon="search">
                视频
            </van-tabbar-item>
            <van-tabbar-item replace to="/study" icon="friends-o">
                学习
            </van-tabbar-item>
            <van-tabbar-item replace to="/mine" icon="setting-o">
                我的
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {},
        //生命周期 - 挂载完成（访问DOM元素）
        mounted() {}
    }
</script>
<style scoped>
    /* @import url(); 引入css类 */
</style>