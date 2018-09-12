const app = getApp()
Page({
    data: {
        redirectUrl: '',
        userName: '',
        passwordCode: '',
        activityId:null,
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function(options) {
        wx.login({
            //获取code
            success: function (res) {
                wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxcaa7532bcf10ab9e&secret=e6357f815b230d74c9c09cd74c086092&js_code=' + res.code + '&grant_type=authorization_code',
                    data: {},
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res.data.openid)
                        console.log(res.data.session_key)

                    }
                })

            }
        })
        
        if (options.redirectUrl != undefined && options.redirectUrl != "undefined") {
            this.setData({
                redirectUrl: options.redirectUrl,
                activityId: options.activityId
            })
        }else{
            this.setData({
                redirectUrl: '../index/index'
            })
        }

    },
    userName: function(event) {
        var _this = this;
        var value = event.detail.value;
        _this.setData({
            userName: value
        })
    },
    passwordCode: function(event) {
        var _this = this;
        var value = event.detail.value;
        _this.setData({
            passwordCode: value
        })
    },
    travel_button: function() {
        var _this = this;
        if (_this.data.userName == '') {
            wx.showToast({
                title: '请输入用户名',
                image: '../../imgse/warning-01.png',
                duration: 1000,
                mask: true
            })
            return false
        }
        if (_this.data.passwordCode == '') {
            wx.showToast({
                title: '请输入密码',
                image: '../../imgse/warning-01.png',
                duration: 1000,
                mask: true
            })
            return false
        }
        wx.showToast({
            title: '登录中...',
            icon: 'loading',
            duration: 2000000,
            mask: false
        })
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res.userInfo)
                            //用户已经授权过
                        }
                    })
                }
            }
        })
        
        wx.request({
            url: app.data.api + 'login',
            method: "POST",
            data: {
                "loginName": _this.data.userName,
                "pwssowrd": _this.data.passwordCode
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                console.log(res.data.code)
                // wx.redirectTo({
                //     url: _this.data.redirectUrl
                // })
                if (res.statusCode == 200 || res.statusCode == '200')
                {
                    wx.hideToast()
                    if (res.data.code == 1000 || res.data.code == '1000')
                    {

                    }else{
                        wx.showModal({
                            title: '提示',
                            content: res.data.message,
                            showCancel: false,
                            confirmColor: '#3bc983',
                            success: function (res) {
                                if (res.confirm) {
                                } else if (res.cancel) {
                                }
                            }
                        })
                    }
                }else{

                }
            }
        })
    },
    bindGetUserInfo: function (e) {
        console.log(e.detail.userInfo)
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            wx.getUserInfo({
                success: function (res) {
                    console.log(res)
                    console.log(res.userInfo.avatarUrl);
                    console.log(res.userInfo.nickName);
                }
            })

        } else {
            //用户按了拒绝按钮
        }
    },
    onReady: function () {
        this.authorization = this.selectComponent("#authorization");
    },
    getPhoneNumber: function (e) {
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '未授权',
                success: function (res) { }
            })
        } else {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '同意授权',
                success: function (res) { }
            })
        }
    }

})