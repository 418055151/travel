const app = getApp()
Page({
  data: {
      nickName:'',
      avatarUrl:'',
      cellPhone:'点击登录'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this = this;
      wx.getUserInfo({
          withCredentials: true,//此处设为true，才会返回encryptedData等敏感信息
          success: res => {
              console.log(res)
              app.data.authorization = false;
              app.data.userName = res.userInfo.nickName;
              app.data.userAvatar = res.userInfo.avatarUrl;
              _this.setData({
                  nickName: res.userInfo.nickName,
                  avatarUrl: res.userInfo.avatarUrl
              })
          }
      })
  },
    onReady: function () {
        // this.dialog = this.selectComponent("#dialog");
        this.authorization = this.selectComponent("#authorization");
    },
    _TabFooterNav() {
        this.dialog.TabFooterNav();
    },
    ServiceTel(){
        
        wx.makePhoneCall({
            phoneNumber: '13220161900', //此号码并非真实电话号码，仅用于测试
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })

    }
})