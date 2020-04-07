<template>
  <div id="app">
    <div id="nav">
      <router-link tag="div" to="/">Home</router-link> |
      <div @click="toAbout">About</div>
    </div>
    <router-view/>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        id:'1年级',
        mine:'数学'
      };
    },
    methods:{
      toAbout:function(){
        this.$router.push({path:`/about/${this.id}/mine/${this.mine}`})
      }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {},
    
  };
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: center;

  div {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
