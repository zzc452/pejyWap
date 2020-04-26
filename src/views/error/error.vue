<!-- 404 -->
<template>
    <div id="page-error-wrap">
        <div class="content-box">
            <div class="tit-box">
                <img src="../../assets/img/404.png" alt="">
                <h4>404错误</h4>
                <p>您访问的页面不存在</p>
            </div>
            <van-button color="linear-gradient(to right, #ff6900, #de5900)" block to="/home">返回首页</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {},
        //生命周期 - 挂载完成（访问DOM元素）
        mounted() {}
    }
</script>
<style lang="less">
    #page-error-wrap {
        display: flex;
        height: 100vh;
        background: @bgWhite;
        justify-content: center;
        align-items: center;
        .content-box {
            text-align: center;
            margin: 0 auto;
            margin-top: -2.4rem;
            .tit-box {
                margin-bottom: .853333rem;
                img {
                    width: 8.266667rem;
                    height: auto;
                    vertical-align: top;
                }
                h4 {
                    font-size: 16px;
                    color: @txtBlack;
                    padding: .32rem 0 .266667rem;
                }
                p {
                    font-size: 14px;
                    color: @txtGrey;
                }
            }
            .van-button {
                    height: 40px;
                    line-height: 38px;
                    width: 110px;
                text-align: center;
                margin: 0 auto;
                }
        }
    }
</style>