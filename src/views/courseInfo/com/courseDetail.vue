<!-- 课程介绍模块 -->
<template>
    <div class="course-detail-box">
        <div class="row1">
            <div class="price-box">
                <div class="price">
                    <strong>免费</strong><span>￥998</span>
                </div>
                <div class="student">38人已报名</div>
            </div>
            <h2 class="title">【语文】初中三年级语文冲刺提分班</h2>
            <div class="play-time">直播时间：3月28日 15:00-16:00 </div>
            <div class="teacher-box">
                <div class="teachers">
                    <div>
                        <img src="../../../assets/img/teacher.png" alt=""><span>胡亦佳</span>
                    </div>
                </div>
                <div class="rate">8次课共16小时 (已开课剩4次直播)</div>
            </div>
        </div>
        <van-divider :style="{  borderColor: '#eeeeee' }"></van-divider>
        <div class="row2 material">是否寄送配套学习资料或学习工具<em>否</em></div>
        
    </div>
</template>

<script>
    export default {
        name: "CourseDetail",
        data() {
            return {}
        }
    }
</script>
<style scoped lang="less">
    .course-detail-box {
        padding-top: .373333rem;
        [class^="row"]{
            padding: 0 .426667rem;
        }
        .price-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price {
                font-size: 0;
                strong {
                    font-size: 26px;
                    color: @txtOrange;
                }
                span {
                    font-size: 12px;
                    color: @txtBlack;
                    text-decoration: line-through;
                    vertical-align: bottom;
                    line-height: 2em;
                    padding-left: .16rem;
                }
            }
            .student {
                font-size: 12px;
                color: @txtGrey;
                align-self: flex-end;
                line-height: 2em;
            }
        }
        .title {
            font-size: 18px;
            color: @txtBlack;
            padding: .213333rem 0 .24rem;
        }
        .play-time {
            font-size: 12px;
            color: @txtBlack;
        }
        .teacher-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: @txtGrey;
            font-size: 12px;
            padding: .293333rem 0;
            .teachers>div {
                height: .8rem;
                line-height: .8rem;
                img {
                    height: 0.8rem;
                    width: 0.8rem;
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: .213333rem;
                }
            }
        }
        .van-divider{
            margin:0;
        }
        .material{
            padding-top: .24rem;
            padding-bottom: .266667rem;
            font-size: 13px;
            color: @txtGrey;
            em{
                float: right;
                color: @txtBlack;
            }
        }
        
    }
</style>