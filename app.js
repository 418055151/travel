//app.js
App({
    data: {
        userid: '',
        Https:'https://www.mxlgsl.cn/m-service/',
        imagesUrl:'https://image.ichengda.xin/',
        api:'https://www.mxlgsl.cn/wechat/',
        authorization:false,
        userName:'',
        userAvatar:''
    },
    onLaunch: function() {
        var _this = this;
        var userid = wx.getStorageSync('userid');
        if (userid == null || userid == ''){
            _this.data.userid = null;
        }else{
            _this.data.userid = userid;
        }
        wx.login({
            //获取code
            success: function (res) {
                wx.request({
                    url:'https://test.mxlgsl.cn/m-service/user/login',
                    data: {
                        code: res.code
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        wx.setStorageSync('openid', res.data.data.openid);
                        wx.setStorageSync('session_key', res.data.data.session_key)
                        _this.data.openid = res.data.data.openid
                        _this.data.session_key = res.data.data.session_key
                    }
                })

            }
        })
    }
})