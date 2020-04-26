<!-- 学习列表二级页 -->
<template>
    <div id="study-inner-wrap">
        <van-notice-bar v-if="today_course===1" wrapable :scrollable="false">提示：今日有课</van-notice-bar>
        <van-list v-model="load_moreing" :finished="load_finished" :finished-text="finished_text" @load="loadMore" :immediate-check="false">
            <Studyitem :course="course_data" v-show="show_course"></Studyitem>
        </van-list>
    </div>
</template>

<script>
    import {
        getStudyCourse
    } from "@/api/study"
    import Studyitem from "./com/Studyitem"
    export default {
        name: 'StudyInner',
        components: {
            Studyitem
        },
        data() {
            return {
                load_finished: false,
                load_moreing: false,
                finished_text: '已经到底啦',
                limit: 5, //每页请求条数
                course_data: [],
                current_page: 1,
                today_course: 2,
                show_course:false
            }
        },
        computed: {},
        methods: {
            gatCourseData(page = 1) {
                if (page == 1) {
                    this.show_course = false
                    this.finished_text = ''
                    this.course_data = [];
                }
                let params = {
                    type: this.$parent.pathType,
                    status: this.$parent.pathStatus,
                    limit: this.limit,
                    page: page
                }
                let vm = this;
                getStudyCourse(params).then(res => {
                    if (res.status === 1) {
                        vm.current_page = res.data.data.current_page;
                        if (page === 1) {
                            this.course_data = res.data.data.data
                            this.today_course = res.data.data.course_status
                            res.data.data.data.length == 0 ? vm.finished_text = '' : vm.finished_text = '已经到底啦';
                        } else {
                            vm.course_data.push(...res.data.data.data);
                            vm.finished_text = '已经到底啦';
                        }
                        if (res.data.data.total <= this.limit || res.data.data.data.length < this.limit) {
                            vm.load_finished = true
                        } else {
                            vm.load_finished = false
                        }
                    }
                }).finally(() => {
                    vm.show_course = true;
                    vm.load_moreing = false;
                })
            },
            loadMore() {
                this.load_moreing = true;
                this.gatCourseData(this.current_page++);
            }
        },
        watch: {
            '$route' () {
                this.gatCourseData()
            }
        },
        created() {
            this.gatCourseData()
        }
    }
</script>
<style lang="less">
    @imgUrl: '../../assets/img/';
    #study-inner-wrap {
        .study-item-wrap {
            .item-box {
                margin-bottom: .333333rem;
            }
        }
        .van-notice-bar {
            height: 32px;
            text-align: center;
            font-size: 13px;
            color: #6B3A18;
            padding: 0;
            background: #fef4eb;
            justify-content: center;
        }
        .van-list {
            padding: .333333rem .333333rem 0;
            .van-list__finished-text {
                font-size: 12px;
                color: @txtGrey;
                position: relative;
                height: 40px;
                line-height: 40px;
                &::before {
                    content: '';
                    width: 1.333333rem;
                    height: 1px;
                    background:url("@{imgUrl}line_left.png");
                    background-size: 100% 100%;
                    position: absolute;
                    left: 50%;
                    top: 20px;
                    margin-left: 44px;
                }
                &::after {
                    content: '';
                    width: 1.333333rem;
                    height: 1px;
                    background:url("@{imgUrl}line_right.png");
                    background-size: 100% 100%;
                    position: absolute;
                    right: 50%;
                    top: 20px;
                    margin-right: 44px;
                }
            }
        }
    }
</style>