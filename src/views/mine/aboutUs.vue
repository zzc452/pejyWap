<!-- 关于我们 -->
<template>
    <div id="about-us-wrap">
        <MyHeader title="关于我们" :border="true" :fixed="true"></MyHeader>
        <div class="content-box">
            <div class="logo"><img src="../../assets/img/logo.png" alt=""></div>
            <div class="txt">
                <p>
                    上海培尔教育科技有限公司致力于运用互联网科技手段 构建便捷、高性价比的移动课堂，打造一批拥有清华、 北大、交大、复旦、浙大等名校背景的名师团队，专注 为7-18岁的孩子提供高品质、全学科在线教育服务。
                </p>
                <p>
                    我们严选千位老师，录取率仅1.5%。主讲老师均毕业自 清北复交等顶尖学府，平均5-10年教龄。长期扎根各省 试卷、考纲、政策研究，熟悉各省考点直击小升初、中 高考难点。多位出身于省、市重点中学，具有中考命 题、押题经验丰富。
                </p>
                <p>
                    我们的服务以学生为中心，多位老师服务于一个孩子。 课程顾问诊断，名师直播教学，班主任1对1作业批改， 助教课后纠正错题，定期考评测试......目前已累计服务学 员10000+，学员单科提分率达85%，平均进步 15-60分，重点高中升学率更是达到65%。
                </p>
            </div>
            <div class="item-box">
                <van-cell title="服务号" value="上海培尔" />
                <van-cell title="订阅号" value="培尔上海" />
                <van-cell title="联系我们" value="021-2606-3668" />
            </div>
            <div class="link-box">
                <router-link to="/usernotice" tag="a">《服务协议》</router-link>
                <i>|</i>
                <router-link to="/agreement" tag="a">《隐私政策》</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>
<style lang="less">
    #about-us-wrap {
        padding-top: 46px;
        background: @bg2Grey;
        box-sizing: border-box;
        min-height: 100vh;
        #public-nav-header {
            .van-nav-bar {
                background: #F8F8F8;
                .van-nav-bar__title {
                    color: @txtBlack;
                }
                .van-icon {
                    color: @txt2Black;
                }
            }
        }
        .content-box {
            padding-top: .666667rem;
            .logo {
                width: 4.186667rem;
                margin: 0 auto;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            .txt {
                padding: 1.12rem .666667rem .32rem ;
                text-align: justify;
                p {
                    margin-bottom: .72rem;
                    font-size: 13px;
                    color: @txtBlack;
                    line-height: 1.4em;
                }
            }
        }
        .item-box {
            margin-bottom: 1.6rem;
            .van-cell {
                color: @txtBlack;
            }
            .van-cell__value {
                color: @txtBlack;
            }
        }
        .link-box {
            text-align: center;
            font-size: 0;
            padding-bottom: .506667rem;
            a {
                font-size: 12px;
                color: @txtOrange;
                text-decoration: none;
            }
            i {
                font-size: 12px;
                color: @txtGrey;
                padding: 0 2px;
            }
        }
    }
</style>