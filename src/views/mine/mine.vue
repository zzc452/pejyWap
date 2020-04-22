<!-- 个人中心 -->
<template>
  <div id="mine">
    <div class="toparea">
      <router-link tag="div" class="user-box" v-if="userInfo.token" to="/accountsetting">
        <div class="pic">
          <img :src="userInfo.info.avatar?userInfo.info.avatar:default_avatar" alt="">
        </div>
        <div class="txt">
          <h6>{{userInfo.info.nickname}}</h6>
          <p>{{userInfo.info.mobile}}</p>
        </div>
      </router-link>
      <div class="user-box" @click="gotoLogin" v-else>
        <div class="pic">
          <img src="../../assets/img/my_setAvatar.png" alt="">
        </div>
        <div class="txt">
          <h6>未登录</h6>
          <p>欢迎来到陪尔教育</p>
        </div>
      </div>
      <div class="mine-menu-box">
        <div class="menu-list">
          <van-cell is-link>
            <div slot="title" class="order">我的订单</div>
          </van-cell>
          <van-cell is-link>
            <div slot="title" class="notice">用户须知</div>
          </van-cell>
          <van-cell is-link>
            <div slot="title" class="aboutus">关于我们</div>
          </van-cell>
          <van-cell is-link>
            <div slot="title" class="setting">系统设置</div>
          </van-cell>
        </div>
      </div>
    </div>
    <MyMainnav></MyMainnav>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: "Mine",
    data() {
      return {
        default_avatar: require('../../assets/img/error.jpg')
      };
    },
    computed: {
      ...mapState('user', [
        'userInfo'
      ])
    },
    methods:{
      gotoLogin(){
        this.$store.commit('path/SAVE_LOGIN_REDIRECT_PATH','/mine');
        this.$router.push('/login')
      }
    }
  };
</script>
<style lang="less" scoped>
  @imgUrl: "../../assets/img/";
  #mine {
    min-height: 100vh;
    box-sizing: border-box;
    background: @bg2Grey;
    padding-bottom: 50px;
    .toparea {
      height: 7.146667rem;
      background: url("@{imgUrl}bg_mine.png") 0 0 no-repeat;
      background-size: 100% auto;
      .user-box {
        cursor: pointer;
        padding: 1.173333rem .586667rem 1.36rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 1.733333rem;
        .pic {
          flex: 0 0 1.733333rem;
          border-radius: .866667rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .txt {
          color: @txtWhite;
          padding-left: .373333rem;
          h6 {
            font-size: 20px;
            margin-bottom: 2px;
            font-weight: 500;
          }
          p {
            font-size: 12px;
          }
        }
      }
      .mine-menu-box {
        padding: 0 .333333rem;
        .menu-list {
          background: @bgWhite;
          border-radius: .426667rem;
          overflow: hidden;
          box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.1);
          .van-cell {
            height: 1.546667rem;
            line-height: 1.546667rem;
            padding: 0 .64rem 0 .586667rem;
            align-items: center;
            &:not(:last-child)::after {
              left: .4rem;
              right: .373333rem;
            }
            .van-cell__title {
              font-size: 16px;
              color: @txtBlack;
              div {
                padding-left: .853333rem;
              }
            }
            .order {
              background: url("@{imgUrl}mine_order.png") 0 center no-repeat;
              background-size: .493333rem auto;
            }
            .notice {
              background: url("@{imgUrl}mine_notice.png") 0 center no-repeat;
              background-size: .52rem auto;
            }
            .aboutus {
              background: url("@{imgUrl}mine_about.png") 0 center no-repeat;
              background-size: .506667rem auto;
            }
            .setting {
              background: url("@{imgUrl}mine_setting.png") 0 center no-repeat;
              background-size: .52rem auto;
            }
          }
        }
      }
    }
  }
</style>