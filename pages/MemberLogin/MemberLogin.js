// pages/MemberLogin/MemberLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      MessageAuthenticationLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
    MessageAuthenticationShow(){
        this.setData({
            MessageAuthenticationLogin:true
        })
    },
    cancel(){
        this.setData({
            MessageAuthenticationLogin:false
        })
    }
})