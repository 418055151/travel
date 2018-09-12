// pages/Payment/Payment.js
var second, minute, hour, countdown;
Page({
  data: {
      temptime:'00:30:00',
      clock:'',
      examtype:true,
      starttime: '2018/9/2',
      timespan: '',
      timer: null,
      model: [
          {
              image: 'https://www.mxlgsl.cn/static/images/wechat/weixin.png',
              title: '微信支付',
              sub_title: '仅在微信客户端内支付',
              selectImage: true,
              PaymentWay:'1000'
          },
          {
              image: 'https://www.mxlgsl.cn/static/images/wechat/zhifubao.png',
              title: '支付宝支付',
              sub_title: '仅在支付宝官网和客户端内支付',
              selectImage: false,
              PaymentWay:'1001'
          }
      ],
      PaymentWay:'1000',
  },
  onLoad: function (options) {
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
      var initializetiem = _this.data.temptime.split(":");
      hour = initializetiem[0];
      minute = initializetiem[1];
      second = initializetiem[2];
      var timer = setTimeout(_this.getTimes, 1000);
      _this.setData({
          timer: timer,
      })
  },
    getTimes: function () {
        var _this = this;
        if (_this.data.examtype) {
            if (second >= 1) {
                second = (second - 1 > 9) ? (second - 1) : "0" + (second - 1);
            } else {
                second = "59";
                if (minute >= 1) {
                    minute = (minute - 1 > 9) ? (minute - 1) : "0" + (minute - 1);
                } else {
                    minute = "59";
                    if (hour >= 1) {
                        hour = (hour - 1 > 9) ? (hour - 1) : "0" + (hour - 1);
                    } else {
                        minute = "00";
                        hour = "0" + 0;
                    }
                }
            }
            countdown = minute + ":" + second;
            if (hour == 0 && minute == 0 && second == 0) {
                _this.setData({
                    examtype: false
                })
                wx.showModal({
                    title: '提示',
                    showCancel: false,
                    confirmColor: '#04A9F4',
                    content: '抱歉，付款时限已到，请重下订单。',
                    success: function (res) {
                        if (res.confirm) {
                            wx.navigateBack({
                                delta: -1
                            });
                        }
                    }
                })
            } else {
                var timer = setTimeout(_this.getTimes, 1000);
                _this.setData({
                    timer: timer,
                })
            }
            _this.setData({
                clock: countdown
            })
        }
    },
    onUnload() {
        clearInterval(this.data.timer);
    },
    selectClick: function (event){
        this.data.PaymentWay = event.currentTarget.dataset.paymentway
        for (var i = 0; i < this.data.model.length; i++) {
            if (event.currentTarget.id == i) {
                this.data.model[i].selectImage = true
            }
            else {
                this.data.model[i].selectImage = false
            }
        }
        this.setData(this.data)
    },
   
})