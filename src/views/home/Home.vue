<template>
  <div class="home">
    <router-link tag="div" to="/login">登录</router-link>
    <router-link tag="div" to="courselist/1/grade/23/subject/28">选课</router-link>
    <img alt="Vue logo" src="@/assets/logo.png">
    <Pic msg="Welcome to Your Vue.js App"/>
    <MyMainnav></MyMainnav>
  </div>
</template>

<script>
// @ is an alias to /src
import Pic from '@/components/pic.vue'

export default {
  name: 'Home',
  components: {
    Pic
  }
}
</script>
