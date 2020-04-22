<!-- 课时模块 -->
<template>
    <div class="course-period-wrap">
        <div v-if="course_data.length>0">
            <div class="item-box" v-for="(val,index) in course_data" :key="index">
                <div class="info-box">
                    <h6>{{val.title}}</h6>
                    <p>直播时间：{{val.class_time}}</p>
                    <ul>
                        <li><img :src="val.avatar" alt=""><span>{{val.nickname}}</span></li>
                    </ul>
                </div>
                <div class="btn-box">
                    <em v-if="val.live_status === 2"><img src="../../../assets/img/icon_playing.png" alt=""></em>
                    <van-button v-if="val.live_status === 2" size="small" to="" color="linear-gradient(to right,#ff9a57,#ff6901)">开始观看</van-button>
                    <van-button v-else-if="val.live_status === 1" size="small" to="" color="linear-gradient(to right,#d0d3dc,#bcbfc8)">未开课</van-button>
                    <van-button v-else-if="val.live_status === 3" size="small" to="" color="linear-gradient(to right,#d0d3dc,#bcbfc8)">生成回放中</van-button>
                    <van-button v-else size="small" to="" color="linear-gradient(to right,#ff9a57,#ff6901)">看回放</van-button>
                </div>
            </div>
        </div>
        <van-empty v-else class="custom-image" :image="pic_nodata" description="此日暂无课程" />
    </div>
</template>

<script>
    export default {
        props: {
            course_data: {
                type: Array
            }
        },
        data() {
            return {
                pic_nodata: require('@/assets/img/pic_nodata.png')
            }
        }
    }
</script>
<style lang="less">
    .course-period-wrap {
        .item-box {
            display: flex;
            padding: .32rem .4rem;
            justify-content: space-between;
            align-items: center;
            border-radius: .133333rem;
            box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.08);
            margin-bottom: .266667rem;
            background: @bgWhite;
            .info-box {
                flex: 0 1 auto;
                font-size: 12px;
                color: @txtGrey;
                h6 {
                    font-size: 16px;
                    color: @txtBlack;
                    margin-bottom: 4px;
                }
                p {
                    margin-bottom: 6px;
                }
                li {
                    height: 0.8rem;
                    line-height: 0.8rem;
                    img {
                        height: 100%;
                        width: 100%;
                        width: auto;
                        margin-right: .186667rem;
                    }
                }
            }
            .btn-box {
                flex: 1 0 80px;
                white-space: nowrap;
                text-align: right;
                em {
                    display: inline-block;
                    width: 14px;
                    height: 10px;
                    margin-right: 12px;
                    vertical-align: middle;
                    img {
                        vertical-align: top;
                        width: 100%;
                        height: 100%;
                    }
                }
                button {
                    width: 80px;
                    text-align: center;
                    height: 32px;
                    line-height: 32px;
                    vertical-align: middle;
                }
            }
        }
        .van-empty {
            padding: .506667rem 0;
            .van-empty__image {
                height: 3.28rem;
                width: 100%;
                text-align: center;
                img {
                    height: 100%;
                    width: auto;
                }
            }
            .van-empty__description {
                font-size: 13px;
                color: @txtGrey;
                margin-top: -.213333rem;
            }
        }
    }
</style>