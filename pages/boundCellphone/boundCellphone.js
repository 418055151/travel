var interval;
var currentTime = 61;
Page({
    data: {
        SendVerification: '发送验证码',
        disabled:true,
        cellPhone: '',
        cellPhoneType: false,
        cellPhoneMsg: '',
        NewPhone: '',
        NewPhoneType: false,
        NewPhoneMsg: '',
        Verification:'',
        VerificationType:false,
        VerificationMsg:''
    },
    onLoad: function(options) {

    },
    cellPhone(event){
        this.setData({
            cellPhone: event.detail.value
        })
    },
    NewPhone(event) {
        this.setData({
            NewPhone: event.detail.value
        })
    },
    Verification(event){
        this.setData({
            Verification: event.detail.value
        })
    },
    send_verification() {
        var _this = this;
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (_this.data.cellPhone == '' || _this.data.cellPhone == null)
        {
            _this.setData({
                cellPhoneType:true,
                cellPhoneMsg:'请输入手机号'
            })
            return false
        }else{
            _this.setData({
                cellPhoneType: false,
            })
        }
        if (!myreg.test(_this.data.cellPhone)) 
        {
            _this.setData({
                cellPhoneType: true,
                cellPhoneMsg: '手机号码格式有误'
            })
            return false
        } else {
            _this.setData({
                cellPhoneType: false,
            })
        }
        if (_this.data.NewPhone == '' || _this.data.NewPhone == null) {
            _this.setData({
                NewPhoneType: true,
                NewPhoneMsg: '请输入新手机号'
            })
            return false
        } else {
            _this.setData({
                NewPhoneType: false,
            })
        }
        if (!myreg.test(_this.data.NewPhone)) {
            _this.setData({
                NewPhoneType: true,
                NewPhoneMsg: '新手机号码格式有误'
            })
            return false
        } else {
            _this.setData({
                NewPhoneType: false,
            })
        }
        interval = setInterval(function () {
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
    travel_button(){
        var _this = this;
        if (_this.data.cellPhone == '' || _this.data.NewPhone == '')
        {
            wx.showToast({
                title: '请输入手机号',
                image: '../../imgse/warning-01.png',
                duration: 1000,
                mask: true
            })
            return false
        }
        if (_this.data.Verification == '' || _this.data.Verification == null)
        {
            _this.setData({
                VerificationType:true,
                VerificationMsg:'请输入手机短信验证码！'
            })
            return false
        }else{
            _this.setData({
                VerificationType: false,
            })
        }
        wx.showToast({
            title: '绑定中...',
            icon: 'loading',
            duration: 2000000,
            mask: false
        })
    }
})