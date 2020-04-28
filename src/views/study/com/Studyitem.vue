<!-- 学习表组件 -->
<template>
    <div>
        <div v-if="course.length>0" class="study-item-wrap">
            <div class="item-box" v-for="(val,index) in course" :key="index">
                <div class="tit-box">
                    <h6>{{val.title}}</h6>
                    <p>主讲老师：<span v-for="(tea,num) in val.teacher" :key="num">{{tea.nickname}}</span></p>
                </div>
                <van-divider :style="{ borderColor: '#dddddd', margin: '0px' }" />
                <div class="info-list">
                    <div v-for="(item,n) in val.course_item" :key="n" v-show="val.canshow?n<val.canshow:true">
                        <div class="info-box">
                            <div class="left">
                                <h6>{{item.title}}</h6>
                                <p>{{item.time}}</p>
                            </div>
                            <div class="right">
                                <em v-if="item.live_status ===2"></em>
                                <i v-if="item.live_status ===1">未开课</i>
                                <span v-else-if="item.live_status ===2" class="bg-orange">进入课堂</span>
                                <span v-else-if="item.live_status ===3" class="bg-grey">回放生成中</span>
                                <span v-else class="bg-blue">观看回放</span>
                            </div>
                        </div>
                        <van-divider :style="{ borderColor: '#dddddd', margin: '0px' }" />
                    </div>
                </div>
                <div class="footer-box" v-if="val.course_item>2 && courseType == 2 && total>1" @click="showAll(val.canshow)">
                    展开<i></i>
                </div>
            </div>
        </div>
        <MyEmpty v-else txt="暂时没有课程"></MyEmpty>
    </div>
</template>
<script>
    export default {
        name: "StudyItem",
        props: {
            course: {
                type: Array
            },
            total:{
                type:Number
            }
        },
        computed:{
            courseType(){
                return this.$route.params.type==2 ? this.$route.params.type:1
            }
        },
        methods:{
            showAll(show){
                if(show==2){
                    show=''
                }else{
                    show=2
                }
            }
        }
    }
</script>
<style scoped lang="less">
    @imgUrl: '../../../assets/img/';
    .study-item-wrap {
        .item-box {
            padding: 0 .373333rem 0 .453333rem;
            background: @bgWhite;
            border-radius: .373333rem;
            box-shadow: -1px 3px 8px 0px rgba(0, 0, 0, 0.08);
            .tit-box {
                font-size: 12px;
                color: @txtGrey;
                padding: .373333rem 0 .32rem;
                h6 {
                    font-size: 16px;
                    color: @txtBlack;
                    margin-bottom: 4px;
                }
                p span {
                    padding-right: 4px;
                }
            }
            .info-box {
                padding: .293333rem 0;
                font-size: 12px;
                color: @txtGrey;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .left h6 {
                    color: @txtBlack;
                    font-size: 12px;
                    font-weight: normal;
                    margin-bottom: 2px;
                }
                .right {
                    flex: 1 0 90px;
                    text-align: right;
                    i {
                        display: inline-block;
                        width: 70px;
                        text-align: center;
                        color: @txtBlack;
                        font-size: 12px;
                        vertical-align: middle;
                    }
                    span {
                        display: inline-block;
                        width: 70px;
                        height: 26px;
                        line-height: 26px;
                        text-align: center;
                        font-size: 12px;
                        color: @txtWhite;
                        border-radius: 3px;
                    }
                    .bg-blue {
                        background: @gradualBlue;
                    }
                    .bg-orange {
                        background: @gradualOrange;
                    }
                    .bg-grey {
                        background: @gradualGrey;
                    }
                    em {
                        display: inline-block;
                        width: 13px;
                        height: 10px;
                        margin-right: 7px;
                        vertical-align: middle;
                        background: url("@{imgUrl}icon_playing.png") 0 0 no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
            .footer-box {
                height: 16px;
                line-height: 16px;
                text-align: center;
                padding: .24rem 0 .266667rem;
                font-size: 12px;
                color: @txtGrey;
                cursor: pointer;
                i {
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    margin-left: 6px;
                    vertical-align: middle;
                    background: url("@{imgUrl}icon_showMore.png") 0 0 no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }
</style>