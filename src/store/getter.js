const getters = {
    // user
    token: state => state.user.userInfo?state.user.userInfo.token:'',
    userInfo: state => state.user.userInfo?state.user.userInfo.info:null,
    wxLoginStatus: state => state.user.wxLoginStatus,
    loginToPath: state => state.path.loginToPath,
    isWechat: state => state.path.isWechat,
  }
  export default getters