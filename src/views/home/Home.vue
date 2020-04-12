<template>
  <div class="home">
    <router-link tag="div" to="/login">登录</router-link>
    <router-link tag="div" to="/about/123">关于</router-link>
    <img alt="Vue logo" src="@/assets/logo.png">
    <Pic msg="Welcome to Your Vue.js App"/>
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
