<!-- 课程列表页 -->
<template>
    <div id="course-list-wrap">
        <!-- 公共头 -->
        <MyHeader :title="header_title" :fixed="true" :border="true">
            <div class="btn-select-grade" slot="right" @click="showPopGrade">{{now_gradeName}}</div>
        </MyHeader>
        <!-- 课程列表 -->
        <div class="course-list-box">
            <div class="top-select-box">
                <van-tabs @click="changeSubject" v-model="now_subjectId" sticky color="#5789D2" line-height="2" line-width="32" title-active-color="#5789D2" title-inactive-color="#000000">
                    <van-tab v-for="(value,index) in subjects" :key="index" :title="value.name" :name="value.id"></van-tab>
                </van-tabs>
            </div>
            <router-view></router-view>
        </div>
        <!-- 年级选择弹框 -->
        <div class="pop-select-grade">
            <van-dialog v-model="show" title="选择年级" width="90%" confirm-button-color="#FF6900" cancel-button-color="#999999" @confirm="changeGrade" show-cancel-button>
                <div>
                    <GradeItem ref="selectGrade" :grades="all_grades" :selectedId = "selected_gradeId" @passGrade="SelectedGrade"></GradeItem>
                </div>
            </van-dialog>
        </div>
    </div>
</template>

<script>
    import GradeItem from "./com/gradeItem"
    import { getCourseSetting } from "@/api/course"
    export default {
        name:'CourseList',
        components: {
            GradeItem
        },
        data() {
            return {
                subjects: [],           //当前年级下的所有学科
                now_subjectId: 0,        //当前路由对应的科目
                show: false,
                selected_gradeId: '',    //年级弹框选择的年级id
                now_gradeName:'',         //当前路由对应的年级
                all_grades: [],           //年级学科树结构
                study_stage:'',           //学习阶段index,便于切换年级时获取科目
            }
        },
        methods: {
            changeSubject(name) {
                this.$router.push(`/courselist/${this.course_price}/grade/${this.path_gradeId}/subject/${name}`)
            },
            showPopGrade() {
                this.show = true
            },
            changeGrade() {
                this.now_subjectId = this.all_grades[this.study_stage].children && this.all_grades[this.study_stage].children[0].id
                this.$router.push(`/courselist/${this.course_price}/grade/${this.selected_gradeId}/subject/${this.now_subjectId}`)
            },
            SelectedGrade(val,index) {
                this.selected_gradeId = val;
                this.study_stage = index;
            },
            resetPageInfo(){
                let vm = this;
                let level = parseInt(this.path_gradeId)
                let kind = parseInt(this.path_subjectId)
                vm.selected_gradeId = level;
                setTimeout(()=>{vm.now_subjectId = kind},0)
                this.all_grades.forEach(function(val){
                    if(val.children){
                        val.children.forEach(function(item){
                            if(item.id == level){
                                vm.now_gradeName = item.name;
                                vm.subjects = item.children;
                                return;
                            }
                        })
                    }
                })
            },
            getGrade(){
                let parms = 'grade_2'
                getCourseSetting(parms).then(res=>{
                    if(res.status === 1){
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
            path_subjectId(){ //科目类型
                return this.$route.params.kind || '0'
            },
            path_gradeId(){ //年级
                return this.$route.params.level || '1'
            },
            
        },
        created(){
            this.getGrade();
        }
    }
</script>
<style lang="less">
    @imgUrl: '../../assets/img/';
    #course-list-wrap {
        padding-top: 46px;
        .btn-select-grade {
            font-size: 14px;
            height:46px;
            color: #000000;
            padding-right: 16px;
            background: url("@{imgUrl}icon_selctGrade.png") right center no-repeat;
            background-size: 8px auto;
        }
        .course-list-box {
            padding: 0 .453333rem;
            .top-select-box {
                .van-tabs {
                    z-index: 66;
                    .van-tab {
                        padding: 0;
                        font-size: 15px;
                        flex: 0 0 auto;
                        flex-basis: auto!important;
                        margin-right: .64rem;
                        &:nth-last-of-type(2) {
                            margin-right: 0;
                        }
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