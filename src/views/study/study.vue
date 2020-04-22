<!-- 学习页面 -->
<template>
    <div id="page-study">
        <MyHeader title="学习" :leftArrow="false"></MyHeader>
        <div class="calendar-box">
            <div class="calendar-title-box">
               <div class="left-box" @click="setLastMonth">{{lastMonth | formatMonth()}}</div>
               <div class="middle-box">{{current_month | formatMonth()}}</div>
               <div class="right-box" @click="setNextMonth">{{nextMonth | formatMonth()}}</div>
            </div>
            <van-calendar row-height="42" :default-date="today" :min-date="minDate" :maxDate="maxDate" :show-confirm="false" :poppable="false" :show-title="false" :show-subtitle="false" :show-mark="false" @select="selectDay" :formatter="formatter">
            </van-calendar>
        </div>
        <div class="course-block-box">
            <CourseBlock :course_data="course_info"></CourseBlock>
        </div>
        <div class="bottom-btn-box">
            <van-divider :style="{ borderColor: '#dddddd', margin: '0px' }" />
            <van-button size="small" to="studylist/1/studystatus/2" color="linear-gradient(to right,#ee5f62,#e61f24)">免费直播课程</van-button>
            <van-button size="small" to="studylist/2/studystatus/2" color="linear-gradient(to right,#ff9a57,#ff6901)">购买过的课程</van-button>
        </div>
        <MyMainnav></MyMainnav>
    </div>
</template>

<script>
    import CourseBlock from "./com/courseBlock"
    import { getCalendar,getDayCourse } from "@/api/study"
    export default {
        name:"Stydy",
        components:{
            CourseBlock
        },
        data() {
            return {
                today:'',
                course_days:[],
                course_info:[],
                minDate: '', //日历起始日期
                maxDate: '', //日历终止日期
                current_month: new Date().getMonth(),
                current_year: new Date().getFullYear(),
            }
        },
        methods: {
            setMonth(mon = this.current_month,year = this.current_year ) { //渲染选中的月份
                let lastDay = new Date(year, mon + 1, 0).getDate()
                this.minDate = new Date(year, mon, 1)
                this.maxDate = new Date(year, mon, lastDay)
                this.current_month = mon
                this.current_year = year;
            },
            formatter(day) { //遍历日历
                let date = this.$moment(day.date).format('YYYY-MM-DD')
                if(this.course_days.indexOf(date)!== -1){
                    day.bottomInfo  = 1;
                    
                }
                // if(date === this.$moment().format('YYYY-MM-DD')){
                //     day.className = 'today'
                // }
                return day;
            },
            setLastMonth(){ //上一月
                let mon = this.current_month-1<0? this.current_month-1+12 :this.current_month-1
                let year = this.current_month-1<0 ?this.current_year-1:this.current_year
                this.setMonth(mon,year)
                let day = new Date(year, mon, 1)
                this.initCalendar(day)
            },
            setNextMonth(){ //下一月
                let mon = this.current_month+1>11? this.current_month+1-12 :this.current_month+1
                let year = this.current_month+1>11 ?this.current_year+1:this.current_year
                this.setMonth(mon,year);
                let day = new Date(year, mon, 1)
                this.initCalendar(day)
            },
            selectDay(val) {
                let day = this.$moment(val).format('YYYY-MM-DD')
                if(this.course_days.indexOf(day)== -1){
                    this.course_info = []
                    return;
                }
                let params={
                    day:day
                }
                getDayCourse(params).then(res=>{
                    if(res.status === 1){
                        this.course_info = res.data.data
                    }
                })
            },
            initCalendar(day){
                let params = {
                    day:this.$moment(day).format('YYYY-MM-DD')
                }
                getCalendar(params).then(res=>{
                    if(res.status === 1){
                        this.course_days = res.data.data
                    }
                })
            }
        },
        //生命周期 - 创建完成（访问当前this实例）
        created() {
            this.setMonth();
            this.today = new Date();
            this.initCalendar( this.today)
        },
        computed:{
            lastMonth(){
                return this.current_month -1
            },
            nextMonth(){
                return this.current_month +1
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
    #page-study {
        min-height: 100vh;
        box-sizing: border-box;
        background: @bg2Grey;
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
            padding-bottom: .613333rem;
             background: @bgWhite;
            .calendar-title-box{
                height: 30px;
                line-height: 31px;
                padding: .373333rem 15px;
                display: flex;
                justify-content: space-between;
               
                .left-box{
                    padding-left: 14px;
                    background: url("@{imgUrl}icon_calendarLeft.png") left center no-repeat;
                    background-size: auto 13px;
                    font-size: 14px;
                    color: @txtGrey;
                    cursor: pointer;
                }
                .right-box{
                    padding-right: 14px;
                    background: url("@{imgUrl}icon_calendarRight.png") right center no-repeat;
                    background-size: auto 13px;
                    font-size: 14px;
                    color: @txtGrey;
                    cursor: pointer;
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
            background: @bg2Grey;
            margin-top: -.533333rem;
        }
        .bottom-btn-box{
            background: @bg2Grey;
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