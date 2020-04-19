<!-- 学习表免费课组件 -->
<template>
    <div class="study-item-wrap">
        <div class="item-box">
            <div class="tit-box">
                <h6>【英语】初三年级英语特训营</h6>
                <p>主讲老师：胡亦佳</p>
            </div>
                <van-divider :style="{ borderColor: '#dddddd', margin: '0px' }" />
            <div class="info-box">
                <div class="left">
                    <p>直播时间：</p>
                    <p>3月22日 19:30-20:30</p>
                </div>
                <div class="right"><i>未开课</i></div>
            </div>
             <van-divider :style="{ borderColor: '#dddddd', margin: '0px' }" />
            <div class="info-box">
                <div class="left">
                    <p>直播时间：</p>
                    <p>3月22日 19:30-20:30</p>
                </div>
                <div class="right"><span class="bg-blue">观看回放</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StudyItem",
        data() {
            return {
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
<style scoped lang="less">
    @imgUrl:'../../../assets/img/';
    .study-item-wrap{
        .item-box{
            padding: 0 .373333rem 0 .453333rem;
            background: @bgWhite;
            border-radius: .373333rem;
            box-shadow:-1px 3px 8px 0px rgba(0, 0, 0, 0.08);
            .tit-box{
                font-size: 12px;
                color: @txtGrey;
                padding : .373333rem 0;
                h6{
                    font-size: 16px;
                    color: @txtBlack;
                    margin-bottom: 4px;
                }
            }
            .info-box{
                padding: .293333rem 0;
                font-size: 12px;
                color: @txtGrey;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .right{
                    flex: 1 0 90px;
                    text-align: right;
                    i{
                        display: inline-block;
                        width: 70px;
                        text-align: center;
                        color: @txtBlack;
                        font-size: 12px;
                        vertical-align: middle;
                    }
                    span{
                        display: inline-block;
                        width: 70px;
                        height:26px;
                        line-height: 26px;
                        text-align: center;
                        font-size: 12px;
                        color: @txtWhite;
                        border-radius: 3px;
                    }
                    .bg-blue{
                        background: @gradualBlue;
                    }
                    .bg-orange{
                        background: @gradualOrange;
                    }
                    .bg-grey{
                        background: @gradualGrey;
                    }
                    em{
                        display: inline-block;
                        width:13px;
                        height:10px;
                        margin-right: 7px;
                        vertical-align: middle;
                        background: url("@{imgUrl}icon_playing.png") 0 0 no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }
</style>