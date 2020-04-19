<!-- 课程介绍模块 -->
<template>
    <div class="course-detail-box">
        <div class="row1">
            <div class="price-box">
                <div class="price">
                    <strong>{{courseInfo.price >=0 ?'￥'+courseInfo.price:courseInfo.price}}</strong><span>￥{{courseInfo.underlined_price}}</span>
                </div>
                <div class="student">{{courseInfo.sales_num}}人已报名</div>
            </div>
            <h2 class="title">{{courseInfo.title}}</h2>
            <div class="play-time">直播时间：{{courseInfo.start_play_friendly}} </div>
            <div class="teacher-box">
                <div class="teachers">
                    <div v-for="(val,index) in courseInfo.teacher" :key="index">
                        <img :src="val.avatar | formatUrl()" alt=""><span>{{val.nickname}}</span>
                    </div>
                </div>
                <div class="rate">{{courseInfo.all_num}}次课共{{courseInfo.all_play_time}} (已开课剩{{courseInfo.num}}次直播)</div>
            </div>
        </div>
        <van-divider :style="{  borderColor: '#eeeeee' }"></van-divider>
        <div class="row2 material">是否寄送配套学习资料或学习工具<em>{{courseInfo.have_materials===1?'是':'否'}}</em></div>
    </div>
</template>

<script>
    export default {
        name: "CourseDetail",
        props:{
            courseInfo:{
                type:Object
            }
        },
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
                    border-radius: 0.4rem;
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