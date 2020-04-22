<!-- 往期视频 -->
<template>
    <div class="pastvideo-btn-box" @click="playVideo">
        <div></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods:{
            playVideo(){
                alert('回放生成中')
            }
        }
    }
</script>
<style scoped lang="less">
    @imgUrl: '../../../assets/img/';
    .pastvideo-btn-box{
        padding:.506667rem 0;
        background:@bgWhite;
        div{
            cursor: pointer;
            height: 1.6rem;
            width: 7.466667rem;
            margin: 0 auto;
            background: url("@{imgUrl}btn_pastVideo.png");
            background-size: 100% 100%;
        }
    }
</style>