
<!-- 找回密码 -->
<template>
  <div id="find-password-wrap">
    <MyHeader :title="'找回密码'" :border="true"></MyHeader>
    <div class="inner-box">
      <van-form validate-first @submit="resetPassword">
        <div class="input-wrap">
        <div class="input-box borderBottom">
          <van-field v-model="mobile" name="mobile" placeholder="请输入手机号" maxlength="11" type="number" />
        </div>
        <div class="input-box code-box">
          <div class="left-area borderBottom">
            <van-field v-model="code" name="code" placeholder="请输入验证码" maxlength="4" type="number"></van-field>
          </div>
          <div class="right-area">
            <span @click="getCode" v-show="!is_countDown">获取验证码</span>
            <van-count-down v-show="is_countDown" :auto-start="false" ref="countDown" :time="countdown_time" format="ss 秒" @finish="countDownFinish" />
          </div>
        </div>
        <div class="input-box borderBottom">
          <van-field v-model="password" name="password" placeholder="请设置您的密码（6-16数字或字母）" maxlength="16" />
        </div>
        <div class="input-box borderBottom">
          <van-field v-model="repassword" name="repassword" placeholder="请输入手机号" maxlength="16" type="number" />
        </div>
        </div>
        <LoginBtn :can_submie="true" :isLogining="this.isLogining"></LoginBtn>
      </van-form>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from "vuex";
  import {
    getMobileCode,
    passRepassword
  } from "@/api/login.js";

  import LoginBtn from "./com/loginBtn";
  export default {
    data() {
      return {
        mobile: "",
        code: "",
        password: "",
        repassword: "",
        scene: 3,
        countdown_time: 60 * 1000,
        is_countDown: false,
        isLogining: false
      };
    },
    components: {
      LoginBtn,
    },
    computed: {
      ...mapState("user", ["userInfo"])
    },
    methods: {
      getCode() {
        let phoneReg = /^1[3456789]\d{9}$/;
        if (!phoneReg.test(this.mobile)) {
          this.$toast("请输入正确手机号");
          return;
        }
        this.is_countDown = true;
        this.$refs.countDown.start();
        this.toast.loading("获取中...");
        getMobileCode(this.mobile, this.scene).then(res => {
          alert("成功");
          console.log(res);
        });
      },
      countDownFinish() {
        this.is_countDown = false;
        this.$refs.countDown.reset();
      },
      resetPassword() {
        this.isLogining = true;
        passRepassword(this.mobile, this.code, this.password, this.repassword)
          .then(() => {})
          .catch(err => {
            console.log(err);
          });
      },
      ...mapMutations("user", ["SAVE_USER"]),
      goLogin() {
        this.SAVE_USER({
          name: "jone"
        });
        let path = this.$route.query.redirect ?
          decodeURI(this.$route.query.redirect) :
          "/";
        this.$router.push(path);
      }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {}
  };
</script>
<style lang="less">
  #find-password-wrap {
    padding-top: 0.32rem;
    .inner-box {
      padding: 0.826667rem 1rem 0;
      .input-wrap {
        margin-bottom: 2.24rem;
        .borderBottom {
          border-bottom: 1px solid #c6c6c6;
        }
        .van-cell {
          padding: 15px 0;
          input {
            font-size: 17px;
            color: #000;
          }
        }
        .code-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .right-area {
            width: 98px;
            text-align: center;
            flex: 0 1 98px;
            span {
              font-size: 16px;
              color: #fe6800;
              cursor: pointer;
              display: block;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
</style>