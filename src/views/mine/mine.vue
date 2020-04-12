<!-- 个人中心 -->
<template>
  <div id="mine">
    <p>我的个人中心{{$route.params.user}}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {},
  };
</script>
<style lang="less" scoped>
  /* @import url(); 引入css类 */
  #mine {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    p {
      font-size: 16px;
    }
  }
</style>