<!-- 课程二级页面 -->
<template>
  <div id="course-inner-wrap">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="load_moreing" :finished="load_finished" :finished-text="finished_text" @load="loadMore" :immediate-check="false">
        <CourseItem :courseItem="course_data" :courseType="course_price" v-show="show_course"></CourseItem>
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
        load_moreing: false,
        load_finished: false,
        finished_text: '没有更多了',
        refreshing: false,
        course_data: [], //所有课程数据
        current_page: '', //当前页
        show_course: false
      };
    },
    methods: {
      onRefresh() {
        this.getCourseData(1, 'refresh');
      },
      loadMore() {
        this.load_moreing = true;
        let page = this.current_page + 1
        this.getCourseData(page, 'loadmore')
      },
      getCourseData(page = 1, type = 'default') {
        page = parseInt(page);
        if (page === 1 && type === 'default') {
          this.show_course = false
          this.finished_text = ''
        }
        if (!this.path_subjectId) {
          this.show_course = true;
          this.refreshing = false;
          this.course_data = [];
          this.$toast("暂无数据")
          return;
        }
        let params = {
          price: this.course_price,
          attr_id: this.path_subjectId,
          page: page,
          type: type
        }
        let vm = this
        getCourseList(params).then(res => {
          if (res.status === 1) {
            if (type == 'refresh') {
              this.$toast.success('刷新成功')
            }
            if (page === 1) {
              vm.course_data = res.data.data.data;
              res.data.data.data.length == 0 ? vm.finished_text = '' : vm.finished_text = '没有更多了';
            } else {
              vm.course_data.push(...res.data.data.data);
              vm.finished_text = '没有更多了';
            }
            vm.current_page = res.data.data.current_page;
            if (res.data.data.total <= 10 || res.data.data.data.length == 0) {
              vm.load_finished = true
            }
          }
        }).catch(err => {
          vm.$toast.fail('网络错误，请稍后重试');
          throw new Error(err)
        }).finally(() => {
          vm.show_course = true;
          vm.refreshing = false;
          vm.load_moreing = false;
        })
      }
    },
    computed: {
      course_price() { //课程类型
        return this.$route.params.type;
      },
      path_subjectId() { //科目类型
        return this.$route.params.kind;
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
    created() {
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