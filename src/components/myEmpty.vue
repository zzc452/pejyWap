<!-- 无数据状态 -->
<template>
    <div class="no-data-wrap">
        <van-empty :image="pic_nodata" :description="txt" />
    </div>
</template>

<script>
    export default {
        name: "MyEmpty",
        props: {
            txt: {
                type: String,
                default:'暂无数据'
            }
        },
        data() {
            return {
                pic_nodata: require('@/assets/img/pic_nodata.png')
            }
        }
    }
</script>
<style lang="less">
    .no-data-wrap {
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