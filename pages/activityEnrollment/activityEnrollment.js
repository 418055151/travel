// pages/activityEnrollment/activityEnrollment.js
Page({
    data: {
        starttime: '2018/9/2',
        timespan: '',
        timer: null,
        genderMask:false,
        voucherMask: false,
        genderindex:'',
        voucherindex:'',
        univalence: 180,
        numAmx: 5,
        num: 1,
        apply: [{
            Realname: '',
            gender: '男',
            voucher: '身份证',
            IDNumber: '',
            Mobilephone: '',
            position: ''
        }]
    },

    onLoad: function(options) {
        console.log(options)
        var _this = this;
        var starttime = new Date(_this.data.starttime);
        _this.data.timer = setInterval(function () {
            var nowtime = new Date();
            var time = starttime - nowtime;
            var day = parseInt(time / 1000 / 60 / 60 / 24);
            var hour = parseInt(time / 1000 / 60 / 60 % 24);
            var minute = parseInt(time / 1000 / 60 % 60);
            var seconds = parseInt(time / 1000 % 60);
            _this.setData({
                timespan: day + "天" + hour + "时" + minute + "分" + seconds + "秒",
            })
        }, 1000);
    },
    onUnload() {
        clearInterval(this.data.timer);
    },
    minus: function () {
        var _this = this;
        if (_this.data.num > 1) {
            var apply = _this.data.apply;
            var arr = apply.pop()
            _this.setData({
                num: _this.data.num - 1,
                apply: apply
            })
        }
    },
    add: function () {
        var _this = this;
        var apply = _this.data.apply;
        var json = {
            Realname: '',
            gender: '男',
            voucher: '身份证',
            IDNumber: '',
            Mobilephone: '',
            position: ''
        };
        if (_this.data.num < _this.data.numAmx) {
            apply.push(json)
            _this.setData({
                num: _this.data.num + 1,
                apply: apply
            })
        }
    },
    gender:function(event){
        var _this = this;
        var index = event.currentTarget.dataset.index;
        _this.setData({
            genderindex:index,
            genderMask: true,
        })
        
    },
    voucher: function (event){
        var _this = this;
        var index = event.currentTarget.dataset.index;
        _this.setData({
            voucherindex: index,
            voucherMask: true,
        })
    },
    cancel(){
        this.setData({
            genderMask:false,
            voucherMask:false
        })
    },
    selectedGender:function(event){
        var _this = this;
        var index = _this.data.genderindex;
        var gender = 'apply[' + index + '].gender';
        var value = event.currentTarget.dataset.value;
        _this.setData({
            [gender]: value,
        })
        _this.cancel()
    },
    selectedVoucher: function (event){
        var _this = this;
        var index = _this.data.voucherindex;
        var voucher = 'apply[' + index + '].voucher';
        var value = event.currentTarget.dataset.value;
        _this.setData({
            [voucher]: value,
        })
        _this.cancel()
    },
    Realname: function (event){
        var _this = this;
        var index = event.currentTarget.dataset.index;
        var Realname = 'apply[' + index + '].Realname';
        var value = event.detail.value;
        _this.setData({
            [Realname]: value,
        })
    },
    IDNumber: function (event){
        var _this = this;
        var index = event.currentTarget.dataset.index;
        var IDNumber = 'apply[' + index + '].IDNumber';
        var value = event.detail.value;
        _this.setData({
            [IDNumber]: value,
        })
    },
    Mobilephone: function (event){
        var _this = this;
        var index = event.currentTarget.dataset.index;
        var Mobilephone = 'apply[' + index + '].Mobilephone';
        var value = event.detail.value;
        _this.setData({
            [Mobilephone]: value,
        })
    },
    position: function (event){
        var _this = this;
        var index = event.currentTarget.dataset.index;
        var position = 'apply[' + index + '].position';
        var value = event.detail.value;
        _this.setData({
            [position]: value,
        })
    },
    activityEnrollment:function(){
        wx.navigateTo({
            url: '../Payment/Payment?'
        })

        var _this = this;
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        for (var i = 0; i < _this.data.apply.length ; i++)
        {
            if (_this.data.apply[i].Realname == '')
            {
                wx.showModal({
                    title: '提示',
                    content: '第' + (i + 1) + '位报名人真实姓名不能为空',
                    showCancel: false,
                    confirmColor: '#3bd484',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
                return false
            }
            if (_this.data.apply[i].IDNumber == '') {
                wx.showModal({
                    title: '提示',
                    content: '第' + (i + 1) + '位报名人证件号码不能为空',
                    showCancel: false,
                    confirmColor: '#3bd484',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
                return false
            }
            if (_this.data.apply[i].Mobilephone == '') {
                wx.showModal({
                    title: '提示',
                    content: '第' + (i + 1) + '位报名人手机号码不能为空',
                    showCancel: false,
                    confirmColor: '#3bd484',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
                return false
            }
            if (!myreg.test(_this.data.apply[i].Mobilephone)) {
                wx.showModal({
                    title: '提示',
                    content: '第' + (i + 1) + '位报名人手机号码格式不正确',
                    showCancel: false,
                    confirmColor: '#3bd484',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
                return false
            }
            if (_this.data.apply[i].position == '') {
                wx.showModal({
                    title: '提示',
                    content: '第' + (i + 1) + '位报名人上车地点不能为空',
                    showCancel: false,
                    confirmColor: '#3bd484',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
                return false
            }
        }
       
    
    
    
    
    
    
    

    }
})