<template>
  <div id="app">
    <keep-alive>
      <router-view v-if='$route.meta.keepAlive'></router-view>
    </keep-alive>
    <router-view v-if='!$route.meta.keepAlive'></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      };
    },
    methods: {},
    //生命周期 - 创建完成（访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {},
  };
</script>
<style lang="less">
  #app {
    background: @bgWhite;
  }
</style>
