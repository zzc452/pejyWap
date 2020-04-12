<!--  -->
<template>
  <div id="pic-wrap">
    <img src="../assets/img/loading.jpg" alt="">
    <img v-for="(img,index) in imgs" :key="index" src="img">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgs:[
          'http://img5.imgtn.bdimg.com/it/u=369702020706379,3200053266&fm=26&gp=0.jpg',
          'http://img4.imgtn.bdimg.com/it/u=3534079907,448806191&fm=26&gp=0.jpg',
          'http://img1.imgtn.bdimg.com/it/u=3744105506,1038520617&fm=26&gp=0.jpg',
          'http://img4.imgtn.bdimg.com/it/u=3186539192,754388&fm=26&gp=0.jpg',
          'http://img3.imgtn.bdimg.com/it/u=2231213310,1772098929&fm=26&gp=0.jpg',
          'http://img1.imgtn.bdimg.com/it/u=2811241563,3967334198&fm=11&gp=0.jpg',
          'http://img0.imgtn.bdimg.com/it/u=2081740685,903175609&fm=26&gp=0.jpg',
          'http://img2.imgtn.bdimg.com/it/u=2228051303,3029043541&fm=11&gp=0.jpg'
        ]
      }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {
    },
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {
    }
  }
</script>

<style scoped>
  /* @import url(); 引入css类 */
  #pic-wrap img{width:100%;}
</style>