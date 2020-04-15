<!-- 课程二级页面 -->
<template>
  <div id="course-inner-wrap">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <CourseItem :courseItem = "course_item" :courseType="course_price"></CourseItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  import {
    getCourseList
  } from "@/api/course"
  import CourseItem from './com/courseItem'
  export default {
    components: {
      CourseItem
    },
    data() {
      return {
        error: false,
        loading: false,
        finished: false,
        refreshing: false,
        all_courseData:null,      //所有课程数据
        current_page:'',           //当前页
        total_page:'',           //总页数
      };
    },
    methods: {
      onRefresh() {
        console.log('刷新')
        let vm = this;
        setTimeout(() => {
          vm.refreshing = false
        }, 3E3)
      },
      onLoad() {
        this.loading = false;
        console.log('加载')
      },
      getCourseData() {
        let params = {
          price: this.course_price,
          attr_id: this.path_subjectId
        }
        getCourseList(params).then(res => {
          if(res.status === 1){
            this.all_courseData = res.data.data;
            this.current_page = res.data.data.current_page;
            this.total_page = res.data.data.total;
          }
        })
      }
    },
    computed:{
      course_price() { //课程类型
          return this.$route.params.type;
      },
      path_subjectId(){ //科目类型
          return this.$route.params.kind;
      },
      course_item(){
        return this.all_courseData && this.all_courseData.data
      }
    },
    watch: {
      '$route' (to, from) {
        if (to.params.level !== from.params.level) {
          this.$parent.resetPageInfo();
        }
        this.getCourseData();
      }
    },
    created(){
      this.getCourseData();
    }
  };
</script>
<style scoped lang="less">
  /* @import url(); 引入css类 */
  #course-inner-wrap {
    padding-top: .506667rem;
    .van-pull-refresh {
      overflow: unset;
    }
  }
</style>