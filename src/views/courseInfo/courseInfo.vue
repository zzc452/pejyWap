<!-- 课程详情页 -->
<template>
    <div id="course-info-wrap">
        <MyHeader :leftArrow="false">
            <div class="left-box" slot="left"></div>
        </MyHeader>
        <!-- 课程封面 -->
        <div class="banner-box">
            <img src="../../../public/img/course_banner.png" alt="">
        </div>
        <!-- 课程介绍 -->
        <CourseDetail></CourseDetail>
        <van-tabs v-model="active" scrollspy sticky lazy-render color="##FF6900" title-active-color="##FF6900" title-inactive-color="#000000">
            <van-tab v-for="(val,index) in tab_nav" :title="val" :key="index">
                内容 {{ index }}
            </van-tab>
        </van-tabs>
        <div class="bottom-btn-box">
            <van-divider :style="{ borderColor: '#eeeeee' }"></van-divider>
            <MyButton :title="bottom_btnName"></MyButton>
        </div>
    </div>
</template>

<script>
    import CourseDetail from './com/courseDetail'
    export default {
        name: "CourseInfo",
        components: {
            CourseDetail
        },
        data() {
            return {
                bottom_btnName: '立即购买',
                active: 1,
                tab_nav:['老师','课程','大纲'],
            }
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {},
        //生命周期 - 挂载完成（访问DOM元素）
        mounted() {}
    }
</script>
<style lang="less">
    @imgUrl: '../../assets/img/';
    #course-info-wrap {
        padding-bottom: 1.52rem;
        #public-nav-header {
            position: absolute;
            top: 0;
            .left-box {
                width: .8rem;
                height: .8rem;
                background: url("@{imgUrl}icon_leftPointer.png") center no-repeat;
                background-size: 100% 100%;
            }
        }
        .banner-box {
            width: 100%;
            min-height: 3.786667rem;
            img {
                display: block;
                width: 100%;
            }
        }
        .bottom-btn-box {
            position: fixed;
            bottom: 0;
            background: @bgWhite;
            height: 1.52rem;
            display: flex;
            align-items: center;
            padding: 0 .453333rem;
            left: 0;
            right: 0;
            .van-divider {
                margin: 0;
                position: absolute;
                top: 0;
                width: 100%;
            }
            .my-orange-btn {
                width: 100%;
                flex: 1 0 auto;
                .van-button {
                    height: 1.066667rem;
                    line-height: 1.066667rem;
                }
            }
        }
    }
</style>