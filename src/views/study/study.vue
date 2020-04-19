<!-- 学习页面 -->
<template>
    <div id="page-study">
        <MyHeader title="学习" :leftArrow="false"></MyHeader>
        <div class="calendar-box">
            <div class="calendar-title-box">
               <div class="left-box" @click="setLastMonth">{{lastMonth | formatMonth()}}</div>
               <div class="middle-box">{{curront_month | formatMonth()}}</div>
               <div class="right-box" @click="setNextMonth">{{nextMonth | formatMonth()}}</div>
            </div>
            <van-calendar row-height="42" :default-date="today" :min-date="minDate" :maxDate="maxDate" :show-confirm="false" :poppable="false" :show-title="false" :show-subtitle="false" :show-mark="false" @confirm="selectDay" :formatter="formatter">
            </van-calendar>
        </div>
        <div class="course-block-box">
            <CourseBlock></CourseBlock>
        </div>
        <div class="bottom-btn-box">
            <van-divider :style="{ borderColor: '#dddddd', margin: '0px' }" />
            <van-button size="small" to="/studylist" color="linear-gradient(to right,#ee5f62,#e61f24)">免费直播课程</van-button>
            <van-button size="small" to="/studylist" color="linear-gradient(to right,#ff9a57,#ff6901)">购买过的课程</van-button>
        </div>
        <MyMainnav></MyMainnav>
    </div>
</template>

<script>
    import CourseBlock from "./com/courseBlock"
    export default {
        components:{
            CourseBlock
        },
        data() {
            return {
                today:'',
                day:[1,2,3,4,5,16],
                minDate: '', //日历起始日期
                maxDate: '', //日历终止日期
                curront_month: new Date().getMonth(),
                curront_year: new Date().getFullYear(),
            }
        },
        methods: {
            setMonth(mon = this.curront_month,year = this.curront_year ) { //渲染选中的月份
                let lastDay = new Date(year, mon + 1, 0).getDate()
                this.minDate = new Date(year, mon, 1)
                this.maxDate = new Date(year, mon, lastDay)
                this.curront_month = mon
                this.curront_year = year;
            },
            formatter(day) { //遍历日历
                const date = day.date.getDate();
                if(this.day.indexOf(date)!== -1){
                    day.bottomInfo  = '课';
                }
                return day;
            },
            setLastMonth(){ //上一月
                let mon = this.curront_month-1<0? this.curront_month-1+12 :this.curront_month-1
                let year = this.curront_month-1<0 ?this.curront_year-1:this.curront_year
                this.setMonth(mon,year)
            },
            setNextMonth(){ //下一月
                let mon = this.curront_month+1>11? this.curront_month+1-12 :this.curront_month+1
                let year = this.curront_month+1>11 ?this.curront_year+1:this.curront_year
                this.setMonth(mon,year)
            },
            selectDay(val) { 
                alert(val)
            }
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {
            this.setMonth();
            this.today = new Date();
        },
        computed:{
            lastMonth(){
                return this.curront_month -1
            },
            nextMonth(){
                return this.curront_month +1
            }
        },
        filters:{
            formatMonth(val){
                if( val+1 >12 ){
                    val = 1
                }else if(val<0){
                    val=12
                }else{
                    val = val+1
                }
                return val<10 ? '0'+val:val
            }
        }
    }
</script>
<style lang="less">
    @imgUrl: '../../assets/img/';
    @pageBg: #f1f1f1;
    #page-study {
        min-height: 100vh;
        box-sizing: border-box;
        background: @pageBg;
        padding-bottom: 108px;
        #public-nav-header {
            .van-nav-bar {
                background: @gradualOrange;
                .van-nav-bar__title {
                    color: @txtWhite;
                }
            }
        }
        .calendar-box{
            padding-bottom: .533333rem;
             background: @bgWhite;
            .calendar-title-box{
                height: 30px;
                line-height: 31px;
                padding: .506667rem 15px;
                display: flex;
                justify-content: space-between;
               
                .left-box{
                    padding-left: 14px;
                    background: url("@{imgUrl}icon_calendarLeft.png") left center no-repeat;
                    background-size: auto 13px;
                    font-size: 14px;
                    color: @txtGrey;
                }
                .right-box{
                    padding-right: 14px;
                    background: url("@{imgUrl}icon_calendarRight.png") right center no-repeat;
                    background-size: auto 13px;
                    font-size: 14px;
                    color: @txtGrey;
                }
                .middle-box{
                    font-size: 20px;
                    color: @txtBlack;
                    font-weight: bold;
                }
            }
            .van-calendar__month-title{
                display: none;
            }
            .van-calendar__header{
                box-shadow: none;
            }
            .van-calendar__bottom-info{
                font-size: 0;
                width: 8px;
                height: 8px;
                margin:0 auto;
                background: url("@{imgUrl}icon_hasCourse.png") left 1px bottom no-repeat;
                background-size: 6px auto;
            }
            .van-calendar__selected-day{
                background:url("@{imgUrl}icon_calendarSelect.png") center no-repeat;
                background-size: 68% auto;
            }
        }
        .course-block-box{
            border-radius: .426667rem .426667rem 0 0;
            padding: .4rem .333333rem .48rem;
            background: @pageBg;
            margin-top: -.533333rem;
        }
        .bottom-btn-box{
            position: fixed;
            bottom: 55px;
            width: 100%;
            padding: 10px .333333rem;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            .van-divider{
                position: absolute;
                left: 0;
                right: 0;
                top:0;
            }
            button{
                padding:0 16px;
                font-size: 16px;
            }
        }
    }
</style>