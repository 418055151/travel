const app = getApp()
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     * 用于组件自定义设置
     */
    
    properties: {
        authorization: {
            type: Boolean,
            value: false
        }
    },
    data: {
        
    },
    ready() {
        var _this = this;
        wx.getUserInfo({
            lang: 'zh_CN',
            success: function (res) {
                console.log('授权了')
                _this.setData({
                    authorization:false
                })
                app.data.authorization = false
            },
            fail: function (res) {
                console.log('没有授权')
                app.data.authorization = true
                _this.setData({
                    authorization: true
                })
            }
        })
    },
    methods: {
        getUserInfo() {//同意授权，获取用户信息，encryptedData是加密字符串，里面包含unionid和openid信息
        var _this = this;
            wx.getUserInfo({
                withCredentials: true,//此处设为true，才会返回encryptedData等敏感信息
                success: res => {
                    console.log(res)
                    app.data.authorization = false;
                    app.data.userName = res.userInfo.nickName;
                    app.data.userAvatar = res.userInfo.avatarUrl;
                    _this.setData({
                        authorization:false
                    })
                }
            })
        }
    }
})