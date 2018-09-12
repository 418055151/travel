var Mcaptcha = require('../../utils/mcaptcha.js');
var systemInfo = wx.getSystemInfoSync();
var interval;
var currentTime = 61;
Page({
    data: {
        userName: '',
        imgCode: '',
        Code: '',
        SendVerification: '发送验证码',
        disabled: true,
        PhoneVerificationCode: '',
        PhoneVerificationCodeType: false,
        PhoneVerificationCodeMsg: '',
        PhoneVerification: '',
        PhoneVerificationType: false,
        PhoneVerificationMsg: '',
        password: '',
        passwordType: false,
        passwordMsg: '',
        confirmPassword: '',
        confirmPasswordTye: false,
        confirmPasswordMsg: ''
    },
    onLoad: function(options) {

    },
    onReady: function() {

        var _this = this;
        var screenWidth = systemInfo.screenWidth;
        if (screenWidth > 500) {
            _this.Mcaptcha = new Mcaptcha({
                el: 'canvas',
                width: 80 * 2,
                height: 35 * 2,
                createCodeImg: ""
            });
        } else {
            _this.Mcaptcha = new Mcaptcha({
                el: 'canvas',
                width: 80,
                height: 35,
                createCodeImg: ""
            });
        }

        var Code = _this.Mcaptcha.options.createCodeImg.toLowerCase();
        _this.setData({
            Code: Code
        })
    },
    userName: function(event) {
        this.setData({
            userName: event.detail.value
        })
    },
    onTap() {
        var _this = this;
        _this.Mcaptcha.refresh();
        var Code = _this.Mcaptcha.options.createCodeImg.toLowerCase();
        _this.setData({
            Code: Code
        })
    },
    codeImg: function(event) {
        this.setData({
            imgCode: event.detail.value
        })
    },
    SendVerification: function() {
        var _this = this;
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (_this.data.userName == '' || this.data.userName == null) {
            wx.showToast({
                title: '请输入手机号!',
                image: '../../imgse/warning-01.png',
                duration: 1000,
                mask: true
            })
            return false
        }
        if (!myreg.test(_this.data.userName)) {
            wx.showToast({
                title: '手机号格式错误!',
                image: '../../imgse/warning-01.png',
                duration: 1000,
                mask: true
            })
            return false
        }
        if (_this.data.imgCode == '' || this.data.imgCode == null) {
            wx.showToast({
                title: '请输入图片验证',
                image: '../../imgse/warning-01.png',
                duration: 1000,
                mask: true
            })
            return false
        }
        if (_this.data.imgCode.toLowerCase() != _this.data.Code) {
            wx.showToast({
                title: '图片验证输入有误请重新输入',
                image: '../../imgse/warning-01.png',
                duration: 1000,
                mask: true,
                success: function() {
                    _this.onTap();
                }
            })
            return false
        }
        interval = setInterval(function() {
            currentTime--;
            _this.setData({
                SendVerification: "重新发送(" + currentTime + ')',
                disabled: false
            })
            if (currentTime <= 0) {
                clearInterval(interval)
                _this.setData({
                    SendVerification: '重新发送',
                    disabled: true
                })
                currentTime = 61;
            }
        }, 1000)
    },
    PhoneVerificationCode: function(event) {
        this.setData({
            PhoneVerificationCode: event.detail.value
        })
    },
    PhoneVerification: function(event) {
        this.setData({
            PhoneVerification: event.detail.value
        })
    },
    password: function(event) {
        this.setData({
            password: event.detail.value
        })
    },
    confirmPassword: function(event) {
        this.setData({
            confirmPassword: event.detail.value
        })
    },
    Register_Now: function() {
        var _this = this;
        if (_this.data.PhoneVerificationCode == '' || this.data.PhoneVerificationCode == null) {
            _this.setData({
                PhoneVerificationCodeType: true,
                PhoneVerificationCodeMsg: '请输入手机验证码'
            })
            return false
        } else {
            _this.setData({
                PhoneVerificationCodeType: false,
            })
        }
        if (_this.data.PhoneVerification == '' || this.data.PhoneVerification == null) {
            _this.setData({
                PhoneVerificationType: true,
                PhoneVerificationMsg: '请输入用户名'
            })
            return false
        } else {
            _this.setData({
                PhoneVerificationType: false,
            })
        }
        if (_this.data.password == '' || this.data.password == null) {
            _this.setData({
                passwordType: true,
                passwordMsg: '请输入密码'
            })
            return false
        } else {
            _this.setData({
                passwordType: false,
            })
        }
        if (_this.data.password.length < 6 || this.data.password.length > 18) {
            _this.setData({
                passwordType: true,
                passwordMsg: '鉴于安全考虑,新密码长度请保持在 6 ~ 18 位'
            })
            return false
        } else {
            _this.setData({
                passwordType: false,
            })
        }
        if (_this.data.confirmPassword == '' || this.data.confirmPassword == null) {
            _this.setData({
                confirmPasswordTye: true,
                confirmPasswordMsg: '请确认密码'
            })
            return false
        } else {
            _this.setData({
                confirmPasswordTye: false,
            })
        }
        if (_this.data.password != _this.data.confirmPassword) {
            _this.setData({
                confirmPasswordTye: true,
                confirmPasswordMsg: '两次输入不一致'
            })
            return false
        } else {
            _this.setData({
                confirmPasswordTye: false,
            })
        }
    }

})