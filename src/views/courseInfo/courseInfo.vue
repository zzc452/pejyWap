<!-- 课程详情页 -->
<template>
    <div id="course-info-wrap">
        <MyHeader :leftArrow="false">
            <div class="left-box" slot="left"></div>
        </MyHeader>
        <!-- 课程封面 -->
        <div class="banner-box">
            <img :src="course_data.cover_img | formatUrl()" alt="">
        </div>
        <!-- 课程介绍 -->
        <CourseDetail :courseInfo="course_data"></CourseDetail>
        <div class="under-bar"></div>
        <PastVideo></PastVideo>
        <div class="under-bar"></div>
        <van-tabs v-model="active_tab" scrollspy sticky lazy-render color="#FF6900" line-height="2" line-width="32" title-active-color="#FF6900" title-inactive-color="#000000">
            <van-tab :title="tab_nav[0]">
                <div class="tab-teacher-box">
                    <h6 class="g-tit">老师介绍</h6>
                    <div v-for="(val,index) in course_data.teacher" :key="index">
                        <img :src="val.avatar | formatUrl()" alt="">
                        <p>{{val.nickname}}</p>
                        <span>{{val.intro}}</span>
                    </div>
                </div>
            </van-tab>
            <van-tab :title="tab_nav[1]">
                <div class="tab-course-box">
                    <h6 class="g-tit">课程详情</h6>
                    <img v-for="(val,index) in course_data.info" :src="val.src" :key="index" alt="">
                    <!-- <img src="../../../public/img/course_banner.png" alt=""> -->
                </div>
            </van-tab>
            <van-tab :title="tab_nav[2]">
                <div class="tab-outline-box">
                    <van-cell-group :border="false">
                        <van-cell v-for="(val,index) in course_data.course_item" :key="index">
                            <div class="outline-item" slot="title">
                                <!-- <div class="left-area">
                                    第1-2讲
                                </div> -->
                                <div class="middle-area">
                                    <p>{{val.title}}</p>
                                    <span>{{val.time}}</span>
                                </div>
                                <div class="right-area">
                                    <van-button v-if="val.live_status===4" color="#5c8cd3" size="mini">看回放</van-button>
                                    <span v-else-if="val.live_status===1">未直播</span>
                                    <van-button v-else-if="val.live_status===2" color="#ff6900" size="mini">直播中</van-button>
                                    <van-button v-else color="#cccccc" size="mini">回放生成中</van-button>
                                </div>
                            </div>
                        </van-cell>
                    </van-cell-group>
                </div>
            </van-tab>
        </van-tabs>
        <div class="bottom-btn-box">
            <van-divider :style="{ borderColor: '#eeeeee' }"></van-divider>
            <MyButton v-if="course_data.is_free === 2" title="立即购买"></MyButton>
            <MyButton v-else title="立即报名"></MyButton>
        </div>
    </div>
</template>

<script>
    import CourseDetail from './com/courseDetail'
    import PastVideo from './com/pastVideo'
    import {
        getCourseInfo
    } from '@/api/course'
    export default {
        name: "CourseInfo",
        components: {
            CourseDetail,
            PastVideo
        },
        data() {
            return {
                active_tab: 0,
                tab_nav: ['老师', '课程', '大纲'],
                course_data: {}
            }
        },
        computed: {
            courseId() {
                return this.$route.params.id ? this.$route.params.id : ''
            }
        },
        methods: {
            getInfoData() {
                if (!this.courseId) {
                    this.$toast.error('参数错误');
                    return;
                }
                let params = {
                    id: this.courseId
                }
                getCourseInfo(params).then(res => {
                    if (res.status === 1) {
                        this.course_data = res.data.data
                    }
                })
            }
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {
            this.getInfoData();
        }
    }
</script>
<style lang="less">
    @imgUrl: '../../assets/img/';
    #course-info-wrap {
        padding-bottom: 1.52rem;
        .under-bar {
            height: .266667rem;
            background: #f5f5f5;
        }
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
            z-index: 666;
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
        .van-tabs {
            .van-sticky {
                border-bottom: 1px solid #eeeeee;
            }
            .tab-teacher-box,
            .tab-course-box,
            .tab-outline-box {
                font-size: 14px;
                .g-tit {
                    font-size: 18px;
                    color: #000000;
                    padding: .4rem 0 .48rem .506667rem;
                }
                img {
                    width: 100%;
                }
            }
            .tab-outline-box {
                min-height: 100vh;
                .van-cell {
                    padding: 0 .426667rem 0 .466667rem;
                }
                .outline-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: .266667rem 0 .24rem;
                    .left-area {
                        flex: 0 0 62px;
                        font-size: 12px;
                        color: @txtGrey;
                    }
                    .middle-area {
                        flex: 1 1 auto;
                        color: @txtBlack;
                        line-height: 1.2em;
                        p {
                            font-size: 13px;
                            margin-bottom: 5px;
                        }
                        span {
                            font-size: 12px;
                            color: @txtGrey;
                            vertical-align: top;
                        }
                    }
                    .right-area {
                        flex: 0 1 60px;
                        font-size: 13px;
                        color: @txtBlack;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>