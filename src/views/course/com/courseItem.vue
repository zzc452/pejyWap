<!-- 课程组件 -->
<template>
    <div>
        <div v-if="courseItem.length>0" class="course-item-outer">
            <div class="course-item-box" v-for="( val,index) in courseItem" :key="index" @click="turnToCourseInfo(val.live_status,val.buy_status,val.id)">
                <h4><span class="bg-red" v-if="false">热卖</span>{{val.title}}</h4>
                <div class="course-info-box">
                    <div class="left-box">
                        <!-- 免费课 -->
                        <div class="time-box" v-if="Number(courseType) === 0">
                            <p>开始时间 {{val.start_play_time | formatDate('YYYY年MM月DD日 h:mm')}}</p>
                            <p>结束时间 {{val.end_play_time | formatDate('YYYY年MM月DD日 h:mm')}}</p>
                        </div>
                        <!-- 付费课 -->
                        <div class="time-box" v-else>
                            <p>{{val.start_play_time | formatDate('YYYY年MM月DD日')}}-{{val.end_play_time | formatDate('YYYY年MM月DD日')}}</p>
                            <p>{{val.start_play_friendly}}</p>
                        </div>
                        <ul :class="['teachers-box',{'one-teacher':val.teacher.length<2}]" v-if="val.teacher.length>0">
                            <li v-for="(teach,num) in val.teacher" :key="num">
                                <img v-bind:src="teach.avatar | formatUrl()" alt="">
                                <p>{{teach.nickname}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="right-box">
                        <em class="playing" v-if="val.live_status === 1"></em>
                        <span :class="['grey',{'orange':val.buy_status === 2 || val.live_status === 1},{'blue':val.buy_status === 3}]">{{ val.buy_status | btnText(courseType)}}</span>
                    </div>
                </div>
                <van-divider :style="{ borderColor: '#eeeeee', padding: '0' }"></van-divider>
                <div class="price-box">
                    <div class="student-num">
                        <div v-if="Number(courseType) === 0"><span>{{val.sales_num_base}}人已报名</span>上限{{val.stock+val.sales_num_base}}人</div>
                    </div>
                    <div class="now-price">
                        <em>￥{{val.underlined_price | roundNum()}}</em>优惠价:<strong>￥{{val.price | roundNum()}}</strong>
                    </div>
                </div>
            </div>
        </div>
        <van-empty v-else description="暂无课程安排" />
    </div>
</template>

<script>
    export default {
        name: "CourseItem",
        props: ['courseItem', 'courseType'],
        methods:{
            turnToCourseInfo(live,buy,id){
                if(!this.$store.getters.token){
                    this.$toast('请先登录');
                    let vm = this;
                    setTimeout(()=>{
                        vm.$router.push(`/courseinfo/${id}`);
                    },1E3);
                    return
                }
                this.$router.push(`/courseinfo/${id}`);             
            }
        },
        filters: {
            roundNum(val){
                if(val.includes('.00')){
                    return parseInt(val)
                }else{
                    return val
                }
               
            },
            btnText(val, pattern) {
                let txt = '';
                switch (val) {
                    case 1:
                        if (Number(pattern) === 0) { //免费课
                            txt = "立即报名"
                        } else {
                            txt = "立即购买"
                        }
                        break;
                    case 2:
                        txt = "开始观看"
                        break;
                    case 3:
                        txt = "观看回放"
                        break;
                }
                return txt;
            }
        }
    }
</script>
<style scoped lang="less">
    @imgUrl: '../../../assets/img/';
        .course-item-box {
            padding: .4rem .346667rem .586667rem;
            border-radius: .24rem;
            overflow: hidden;
            box-shadow: 0px 5px 12px 8px #f4f4f4;
            margin-bottom: .533333rem;
            &:last-child{
                margin-bottom: 0;
            }
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
            .course-info-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left-box {
                    flex: 0 1 4.266667rem;
                    word-break: break-word;
                    .time-box {
                        margin-bottom: .24rem;
                        p {
                            font-size: 12px;
                            color: @txtGrey;
                            line-height: 18px;
                        }
                    }
                    .teachers-box {
                        display: flex;
                        justify-content: flex-start;
                        li {
                            text-align: center;
                            margin-right: .266667rem;
                            &:last-child {
                                margin-right: 0;
                            }
                            img {
                                width: .8rem;
                                height: .8rem;
                                display: block;
                                border-radius: 0.4rem;
                                margin: 0 auto;
                            }
                            p {
                                font-size: 12px;
                                color: @txtGrey;
                                line-height: 22px;
                            }
                        }
                        &.one-teacher {
                            li {
                                display: flex;
                                align-items: center;
                                justify-content: flex-start;
                                img {
                                    margin-right: .213333rem;
                                }
                            }
                        }
                    }
                }
                .right-box {
                    flex: 0 0 auto;
                    span {
                        display: inline-block;
                        padding: 0 .506667rem;
                        height: 1.066667rem;
                        line-height: 1.066667rem;
                        font-size: 14px;
                        color: @txtWhite;
                        border-radius: .533333rem;
                        vertical-align: middle;
                        &.grey {
                            background: @gradualGrey;
                        }
                        &.orange {
                            background: @gradualOrange;
                        }
                        &.blue {
                            background: @gradualBlue;
                        }
                    }
                    em {
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: .32rem;
                        width: .586667rem;
                        height: .573333rem;
                        background:url("@{imgUrl}icon_playing.png") 0 0 no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
            .price-box {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                line-height: 24px;
                align-items: center;
                .student-num {
                    color: @txtGrey;
                    span {
                        padding-right: .24rem;
                    }
                }
                .now-price {
                    color: @txtBlack;
                    em {
                        text-decoration: line-through;
                        padding-right: .213333rem;
                    }
                    strong {
                        font-size: 20px;
                        color: @txtOrange;
                        vertical-align: middle;
                        margin-top: -3px;
                        display: inline-block;
                    }
                }
            }
            .van-divider {
                margin: 6px 0;
            }
        }
</style>