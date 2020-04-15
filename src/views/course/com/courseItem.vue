<!-- 课程组件 -->
<template>
    <div class="course-item-box">
        <h4><span class="bg-red">热卖</span>【英语】初中三年级英语同步拓展课</h4>
        <div class="course-info-box">
            <div class="left-box">
                <div class="time-box">
                    <p>3月22日-4月22日</p>
                    <p>每周六 15:00-16:00</p>
                    <p>每周六 15:00-16:00</p>
                </div>
                <ul class="teachers-box one-teacher">
                    <li>
                        <img src="../../../assets/img/teacher.png" alt="">
                        <p>胡亦佳</p>
                    </li>
                    <!-- <li>
                        <img src="../../../assets/img/teacher.png" alt="">
                        <p>胡亦佳</p>
                    </li> -->
                </ul>
            </div>
            <div class="right-box">
                <em></em>
                <span class="grey">立即报名</span>
            </div>
        </div>
        <van-divider :style="{ borderColor: '#eeeeee', padding: '0' }"></van-divider>
        <div class="price-box">
            <div class="student-num">
                <span>38人已报名</span>上限人数1000人
            </div>
            <div class="now-price">
                <em>￥998</em>优惠价:<strong>￥0</strong>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {},
        //生命周期 - 挂载完成（访问DOM元素）
        mounted() {}
    }
</script>
<style scoped lang="less">
    @imgUrl:'../../../assets/img/';
    .course-item-box {
        padding: .4rem .346667rem .586667rem;
        border-radius: .24rem;
        overflow: hidden;
        box-shadow: 0px 5px 9px 6px #f4f4f4;
        h4 {
            font-size: 16px;
            color: @txtBlack;
            line-height: 1.2em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: .266667rem;
            span {
                display: inline-block;
                font-size: 12px;
                color: @txtWhite;
                height: 18px;
                vertical-align: top;
                line-height: 18px;
                padding: 0 8px;
                margin-right: 4px;
                margin-top: 1px;
                border-radius: 4px;
                &.bg-red {
                    background: @iconRed;
                }
                &.bg-orange {
                    background: @iconOrange;
                }
            }
        }
        .course-info-box{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left-box{
                flex: 0 1 auto;
                .time-box {
                    margin-bottom: .24rem;
                    p{
                        font-size: 12px;
                        color: @txtGrey;
                        line-height: 18px;
                    }
                }
                .teachers-box{
                    display: flex;
                    justify-content: flex-start;
                    li{
                        text-align: center;
                        margin-right: .266667rem;
                        &:last-child{
                            margin-right:0;
                        }
                        img{
                            width: .8rem;
                            height: .8rem;
                            display: block;
                            border-radius: 0.4rem;
                            margin: 0 auto;
                        }
                        p{
                            font-size: 12px;
                            color: @txtGrey;
                            line-height: 22px;
                        }
                    }
                    &.one-teacher{
                        li{
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            img{
                                margin-right:.213333rem;
                            }
                        }
                    }
                }
            }
            .right-box{
                flex:  0 1 auto;
                span{
                    display: inline-block;
                    padding:0 .506667rem;
                    height: 1.066667rem;
                    line-height: 1.066667rem;
                    font-size: 14px;
                    color: @txtWhite;
                    border-radius: .533333rem;
                    vertical-align: middle;
                    &.grey{
                        background: @gradualGrey;
                    }
                    &.orange{
                        background: @gradualOrange;
                    }
                    &.blue{
                        background: @gradualBlue;
                    }
                }
                em{
                    display: inline-block;
                    vertical-align: middle;
                    margin-right:.32rem;
                    width:.586667rem;
                    height: .573333rem;
                    background:url("@{imgUrl}icon_playing.png") 0 0 no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
        .price-box{
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            line-height: 24px;
            align-items: center;
            .student-num{
                color:@txtGrey;
                span{
                    padding-right: .24rem;
                }
            }
            .now-price{
                color: @txtBlack;
                em{
                    text-decoration: line-through;
                    padding-right:.213333rem;
                }
                strong{
                    font-size: 20px;
                    color: @txtOrange;
                    vertical-align: middle;
                    margin-top: -3px;
                    display: inline-block;
                }
            }
        }
        .van-divider{
            margin:6px 0;
        }
    }
</style>