<!-- 课时模块 -->
<template>
    <div class="course-period-wrap">
        <div class="item-box">
            <div class="info-box">
                <h6>作文写作技巧（二）</h6>
                <p>直播时间：3月22日 19:30-20:30</p>
                <ul>
                    <li><img src="../../../assets/img/teacher.png" alt=""><span>胡亦佳</span></li>
                </ul>
            </div>
            <div class="btn-box">
                <em><img src="../../../assets/img/icon_playing.png" alt=""></em>
                <van-button v-if="false" size="small" to="" color="linear-gradient(to right,#ff9a57,#ff6901)">开始观看</van-button>
                <van-button size="small" to="" color="linear-gradient(to right,#d0d3dc,#bcbfc8)">未开课</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        }
    }
</script>
<style scoped lang="less">
    .course-period-wrap{
        .item-box{
            display: flex;
            padding: .32rem .4rem;
            justify-content: space-between;
            align-items: center;
            border-radius: .133333rem;
            box-shadow:0px 3px 8px 0px rgba(0, 0, 0, 0.08);
            margin-bottom: .266667rem;
            background:@bgWhite;
            .info-box{
                flex: 0 1 auto;
                font-size: 12px;
                color: @txtGrey;
                h6{
                    font-size: 16px;
                    color: @txtBlack;
                    margin-bottom: 4px;
                }
                p{
                    margin-bottom: 6px;
                }
                li{
                    height: 0.8rem;
                    line-height: 0.8rem;
                    img{
                        height: 100%;
                        width: 100%;
                        width: auto;
                        margin-right: .186667rem;
                    }
                }
            }
            .btn-box{
                flex: 1 0 80px;
                white-space: nowrap;
                text-align: right;
                em{
                    display: inline-block;
                    width: 14px;
                    height:10px;
                    margin-right: 12px;
                    vertical-align: middle;
                    img{
                        vertical-align: top;
                        width:100%;
                        height: 100%;
                    }
                }
                button{
                    width: 80px;
                    text-align: center;
                    height: 32px;
                    line-height:32px;
                    vertical-align: middle;
                }
            }
        }
    }
</style>