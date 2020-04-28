<template>
  <div id="page-home-wrap">
    <div class="search-btn-box">
      <van-search shape="round" background="#ED6106" value="请输入搜索关键词" placeholder="" disabled @click="$router.push('/search')" />
    </div>
    <van-swipe class="banner-box" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <router-link tag="div" to="/courselist/1/grade/23/subject/28">
          <img :src="image" />
        </router-link>
      </van-swipe-item>
    </van-swipe>
    <div class="living-course-box">
      <ul>
        <li>
          <img src="@/assets/img/math.png" alt="">
          <p>语文课</p>
        </li>
        <li>
          <img src="@/assets/img/math.png" alt="">
          <p>语文课</p>
        </li>
        <li>
          <img src="@/assets/img/math.png" alt="">
          <p>语文课</p>
        </li>
      </ul>
    </div>
    <div class="free-living-course">
      <van-cell class="g-title" center is-link value="更多" :border="false" to="/courselist/0/grade/23/subject/28">
        <h2 slot="title" class="title"><span class="atit-icon"></span>免费直播课</h2>
      </van-cell>
      <div class="scroll-box">
        <ul>
          <li>
            <div class="pic">
              <img src="@/assets/img/teach1.png" alt="">
            </div>
            <div class="txt">
              <h4>【英语】初三年级英语特训营</h4>
              <p>直播时间：3月22日 19:30-20:30</p>
              <p>直播时间：3月22日 19:30-20:30</p>
              <MyButton title="开始观看"></MyButton>
            </div>
          </li>
          <li>
            <div class="pic">
              <img src="@/assets/img/teach1.png" alt="">
            </div>
            <div class="txt">
              <h4>【英语】初三年级英语特训营</h4>
              <p>直播时间：3月22日 19:30-20:30</p>
              <p>直播时间：3月22日 19:30-20:30</p>
              <MyButton title="开始观看"></MyButton>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="video-course-box">
      <van-cell class="g-title" center is-link value="更多" :border="false" to="/video">
        <h2 slot="title" class="title"><span class="atit-icon"></span>免费视频</h2>
      </van-cell>
      <ul>
        <li>
          <div class="pic">
            <img src="@/assets/img/video.png" alt="">
            <span class="icon"></span>
          </div>
          <p>初三年级英语特训营</p>
        </li>
        <li>
          <div class="pic">
            <img src="@/assets/img/video.png" alt="">
            <span class="icon"></span>
          </div>
          <p>初三年级英语特训营</p>
        </li>
        <li>
          <div class="pic">
            <img src="@/assets/img/video.png" alt="">
            <span class="icon"></span>
          </div>
          <p>初三年级英语特训营</p>
        </li>
      </ul>
    </div>
    <MyMainnav></MyMainnav>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        images: [
          require('@/assets/img/home_banner.png'),
          require('@/assets/img/home_banner.png'),
          require('@/assets/img/home_banner.png'),
        ],
      }
    }
  }
</script>
<style lang="less">
  @imgUrl: "../../assets/img/";
  #page-home-wrap {
    padding: 54px .333333rem 50px;
    background: url("@{imgUrl}bg_home.png") 0 0 no-repeat;
    background-size: 100% auto;
    .search-btn-box {
      background: #ED6106;
      position: fixed;
      left: 0;
      top: 0;
      height: 54px;
      width: 100%;
      box-sizing: border-box;
      z-index: 66;
      padding: 10px .333333rem 10px;
      .van-search {
        padding: 0;
        .van-search__content {
          background: #F07A2E;
          padding-left: .373333rem;
        }
        .van-field__control:disabled {
          color: @txtWhite;
        }
        .van-field__left-icon .van-icon {
          font-size: 18px;
          color: @txtWhite;
        }
      }
    }
    .banner-box {
      width: 100%;
      height: 4.666667rem;
      margin: 0 auto .533333rem;
      .van-swipe__indicator {
        width: 4px;
        height: 4px;
        border-radius: 2px;
      }
      .van-swipe__indicator--active {
        width: 10px;
        opacity: 1;
      }
      img {
        width: 100%;
      }
    }
    .living-course-box {
      width: 100%; // overflow-x: scroll;
      margin-bottom: .426667rem;
      ul {
        min-width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        li {
          text-align: center;
          padding: 0 .466667rem;
          img {
            width: 1.573333rem;
            height: auto;
          }
          p {
            font-size: 13px;
            color: @txtBlack;
            line-height: 1.4em;
            padding: 6px 0;
          }
        }
      }
    }
    .g-title.van-cell {
      height: 24px;
      line-height: 24px;
      margin-bottom: .4rem;
      padding: 0;
      .van-cell__title h2 {
        font-size: 16px;
        font-weight: bold;
        color: @txtBlack;
        span {
          display: inline-block;
          width: 4px;
          height: 18px;
          border-radius: 2px;
          vertical-align: top;
          background: @bgOrange;
          margin-right: 8px;
          margin-top: 3px;
        }
      }
      .van-cell__value {
        font-size: 12px;
        color: #6F6F6F;
      }
      .van-cell__right-icon {
        color: #6F6F6F;
        font-size: 12px;
        margin-left: 0;
      }
    }
    .free-living-course {
      .scroll-box {
        margin-left: -0.333333rem;
        padding-left: 0.333333rem;
        padding-top:.746667rem;
        width: 100vw;
        box-sizing: border-box;
        padding-bottom: .853333rem;
        overflow-x: scroll;
        -webkit-overflow-scrolling:touch;  
        &::-webkit-scrollbar {/*隐藏滚轮*/
        display: none;
        }
        ul {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: nowrap;
          li {
            padding: .346667rem .266667rem .346667rem 4.266667rem;
            box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.1);
            margin-right: .333333rem;
            box-sizing: border-box;
            flex: 0 0 9.066667rem;
            min-height: 4.666667rem;
            border-radius: .2rem;
            position: relative;
            .pic {
              position: absolute;
              left: .266667rem;
              bottom: .266667rem;
              width: 3.733333rem;
              border-radius: 5px;
              overflow: hidden;
              img {
                width: 100%;
                height: auto;
              }
            }
            .txt {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
              h4 {
                font-size: 15px;
                line-height: 20px;
                color: @txtBlack;
                display: -webkit-box;
                margin-bottom: .16rem;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                max-height: 40px;
                text-overflow: ellipsis;
                overflow: hidden;
                flex: 1 0 auto;
              }
              p {
                font-size: 12px;
                color: @txtGrey;
                line-height: 18px;
              }
              .van-button {
                margin-top: .133333rem;
                width: 2.4rem;
                height: .96rem;
                line-height: .96rem;
                padding: 0;
              }
            }
            
          }
          &::after{
              content: '';
                  height: 4.666667rem;
                  padding-left: 1px;
            }
        }
      }
    }
    .video-course-box{
      ul{
        display: flex;
        flex-wrap: wrap;
        justify-content:space-between;
        align-items: flex-start;
        li{
          flex: 0 0 4.6rem;
          margin-bottom: .32rem;
          .pic{
            width: 4.6rem;
            height: 2.533333rem;
            border-radius: .133333rem;
            overflow: hidden;
            position: relative;
            img{
              width: 100%;
              height: 100%;
              opacity: 0.8;
            }
            .icon{
              position: absolute;
              width: .96rem;
              height: .96rem;
              left: 50%;
              top:50%;
              background: url("@{imgUrl}icon_videoPlay.png");
              transform: translate(-50% ,-50%);
              background-size: contain;
            }
          }
          p{
            font-size: 12px;
            color: @txtBlack;
            line-height: 1.4em;
            padding: .16rem 0;
          }
        }
      }
    }
  }
</style>
