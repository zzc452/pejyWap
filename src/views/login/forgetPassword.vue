
<!-- 找回密码 -->
<template>
  <div id="find-password-wrap">
    <MyHeader title="找回密码" :border="true"></MyHeader>
    <ResetPassword kind="forget"></ResetPassword>
  </div>
</template>

<script>
  import ResetPassword from "./com/resetPassword"
  export default {
    name:'ForgetPassword',
    components:{
      ResetPassword
    }
  };
</script>
<style lang="less">
  @imgUrl: '../../assets/img/';
  #find-password-wrap {
    min-height: 100vh;
    background: url("@{imgUrl}bg_password.png") center bottom no-repeat;
    background-size: 100% auto;
    #public-nav-header {
      .van-nav-bar {
        background: @bgGrey;
        .van-icon {
          color: @txt2Black;
        }
        .van-nav-bar__title {
          color: @txt2Black;
        }
        .van-hairline--bottom::after {
          border-color: #E0E0E0;
        }
      }
    }
  }
</style>