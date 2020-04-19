<!-- 学习列表二级页 -->
<template>
    <div id="study-inner-wrap">
        <van-list v-model="load_moreing" :finished="load_finished" :finished-text="finished_text" @load="loadMore" :immediate-check="false">
            <FreeStudyitem></FreeStudyitem>
            <FeeStudyitem></FeeStudyitem>
        </van-list>
    </div>
</template>

<script>
    import FreeStudyitem from "./com/freeStudyitem"
    import FeeStudyitem from "./com/feeStudyitem"
    export default {
        name: 'StudyInner',
        components: {
            FreeStudyitem,
            FeeStudyitem
        },
        data() {
            return {
                load_finished: true,
                load_moreing: false,
                finished_text: '已经到底啦'
            }
        },
        methods: {
            loadMore() {
                console.log('加载完成')
            }
        }
    }
</script>
<style lang="less">
    @imgUrl: '../../assets/img/';
    #study-inner-wrap {
        padding: .333333rem .333333rem 0;
        .study-item-wrap {
            .item-box {
                margin-bottom: .333333rem;
                &:last-of-type {
                    margin-bottom: 0;
                }
            }
        }
        .van-list__finished-text {
            font-size: 12px;
            color: @txtGrey;
            position: relative;
            height: 40px;
            line-height: 40px;
            &::before {
                content: '';
                width: 1.333333rem;
                height: 1px;
                background:url("@{imgUrl}line_left.png");
                background-size: 100% 100%;
                position: absolute;
                left: 50%;
                top: 20px;
                margin-left: 44px;
            }
            &::after {
                content: '';
                width: 1.333333rem;
                height: 1px;
                background:url("@{imgUrl}line_right.png");
                background-size: 100% 100%;
                position: absolute;
                right: 50%;
                top: 20px;
                margin-right: 44px;
            }
        }
    }
</style>