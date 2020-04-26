<!-- 课程列表页 -->
<template>
    <div id="course-list-wrap">
        <!-- 公共头 -->
        <MyHeader :title="header_title" :fixed="true" >
            <div class="btn-select-grade" slot="right" @click="showPopGrade">{{now_gradeName}}</div>
        </MyHeader>
        <!-- 课程列表 -->
        <div class="course-list-box">
            <div class="top-select-box" v-show="subject_show">
                <van-tabs @click="changeSubject" v-model="now_subjectId" :border="false" color="#ffffff" line-height="3" line-width="10" title-active-color="#ffffff" title-inactive-color="#ffffff">
                    <van-tab v-for="(value,index) in subjects" :key="index" :title="value.name" :name="value.id"></van-tab>
                </van-tabs>
            </div>
            <router-view></router-view>
        </div>
        <!-- 年级选择弹框 -->
        <div class="pop-select-grade">
            <van-dialog v-model="show" title="选择年级" width="90%" confirm-button-color="#FF6900" cancel-button-color="#999999" @confirm="changeGrade" show-cancel-button>
                <div>
                    <GradeItem :grades="all_grades" :selectedId="selected_gradeId" @passGrade="SelectedGrade"></GradeItem>
                </div>
            </van-dialog>
        </div>
    </div>
</template>

<script>
    import GradeItem from "./com/gradeItem"
    import {
        getCourseSetting
    } from "@/api/course"
    export default {
        name: 'CourseList',
        components: {
            GradeItem
        },
        data() {
            return {
                subjects: [], //当前年级下的所有学科
                now_subjectId: 0, //当前路由对应的科目
                show: false,
                selected_gradeId: 0, //年级弹框选择的年级id
                selected_subjectId:'', //年级弹框选择的年级id对应第一个科目id
                now_gradeName: '', //当前路由对应的年级
                all_grades: [], //年级学科树结构
            }
        },
        methods: {
            changeSubject(name) { //切换科目
                if(name == this.path_subjectId) return;
                this.$router.push(`/courselist/${this.course_price}/grade/${this.path_gradeId}/subject/${name}`)
            },
            showPopGrade() {
                this.show = true
            },
            changeGrade() { //切换年级
                if (this.selected_gradeId == this.path_gradeId) return;
                this.$router.push(`/courselist/${this.course_price}/grade/${this.selected_gradeId}/subject/${this.selected_subjectId}`)
            },
            SelectedGrade(id, subject) { //选择年级
                this.selected_gradeId = id;
                this.selected_subjectId = subject ? subject : ''
            },
            resetPageInfo() { //根据路由设置页面信息
                let vm = this;
                let kind = parseInt(this.path_subjectId)
                let level = parseInt(this.path_gradeId)
                setTimeout(() => {
                    vm.now_subjectId = kind
                }, 0)
                vm.now_gradeName="选择年级";
                if (level ===0 || !!level) {
                    vm.selected_gradeId = level;
                    this.all_grades.forEach(function(val) {
                        if (val.children) {
                            val.children.forEach(function(item) {
                                if (item.id === level) {
                                    vm.now_gradeName = item.name;
                                    vm.subjects = item.children;
                                    return;
                                }
                            })
                        }
                    })
                }
            },
            getGrade() { //获取年级科目树数据
                let parms = 'grade_2'
                getCourseSetting(parms).then(res => {
                    if (res.status === 1) {
                        this.all_grades = res.data.data;
                        this.resetPageInfo();
                    }
                })
            }
        },
        computed: {
            header_title() {
                return Number(this.$route.params.type) === 1 ? '直播课' : '免费课'
            },
            course_price() { //课程类型
                return this.$route.params.type || '1';
            },
            path_subjectId() { //科目类型
                return this.$route.params.kind || ''
            },
            path_gradeId() { //年级
                return this.$route.params.level || ''
            },
            subject_show(){
                return this.subjects && this.subjects.length>0
            }
        },
        created() {
            this.getGrade();
        }
    }
</script>
<style lang="less">
    @imgUrl: '../../assets/img/';
    #course-list-wrap {
        padding-top: 76px;
        #public-nav-header .van-nav-bar {
            z-index: 888;
        }
        .btn-select-grade {
            font-size: 14px;
            height: 46px;
            line-height: 46px;
            color: @txtWhite;
            padding-right: 16px;
            background: url("@{imgUrl}icon_selctGrade.png") right center no-repeat;
            background-size: 10px auto;
        }
        .course-list-box {
            .top-select-box {
                position: fixed;
                z-index: 889;
                padding: 0 .453333rem;
                background: @gradualOrange;
                top: 45px;
                width: 100%;
                box-sizing: border-box;
                .van-sticky--fixed {
                    padding: 0 0.453333rem;
                }
                .van-tabs {
                    z-index: 66;
                    .van-tabs__wrap{
                        height: 32px;
                    }
                    .van-tab {
                        padding: 0;
                        font-size: 14px;
                        flex: 0 0 auto;
                        line-height: 22px;
                        flex-basis: auto!important;
                        margin-right: .64rem;
                        &:nth-last-of-type(2) {
                            margin-right: 0;
                        }
                    }
                    .van-tab--active {
                        font-weight: bold;
                    }
                    .van-tabs__nav{
                        background: none;
                    }
                    .van-tabs__nav--line{
                        padding-bottom: 11px;
                    }
                }
            }
        }
        .pop-select-grade .van-dialog__header {
            padding: .48rem;
            font-weight: bold;
            font-size: 18px;
        }
    }
</style>