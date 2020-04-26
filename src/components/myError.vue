<!-- 网络错误页面 -->
<template>
    <div class="net-error-wrap">
        <van-empty image="network" :description="txt" />
    </div>
</template>

<script>
    export default {
        name: "MyError",
        props: {
            txt: {
                type: String,
                default:'网络错误，请检查您的网络'
            }
        },
        data() {
            return {
                // pic_nodata: require('@/assets/img/pic_nodata.png')
            }
        }
    }
</script>
<style scoped lang="less">
    .net-error-wrap {
        padding-top: .64rem;
        .van-empty {
            padding: .506667rem 0;
            .van-empty__image {
                height: 3.28rem;
                width: 100%;
                text-align: center;
                img {
                    height: 100%;
                    width: auto;
                }
            }
            .van-empty__description {
                font-size: 13px;
                color: @txtGrey;
                margin-top: -.213333rem;
            }
        }
    }
</style>