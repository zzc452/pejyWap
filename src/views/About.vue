<template>
  <div class="about">
    <h1>This is an about page{{$route.params.id}}</h1>
    <router-view/>
  </div>
</template>

<script>
  export default {
  
  }
</script>

<style lang="scss">
  .about{
    text-align: center;    
    height: 100px;
    box-sizing: border-box;
    padding-top: 40px;
    h1{
      width: 100%;
      font-size: 18px;
      font-weight: bold;
    }
  }
</style>