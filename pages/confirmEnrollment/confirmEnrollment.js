// pages/confirmEnrollment/confirmEnrollment.js
Page({
  data: {
      starttime: '2018/9/2',
      timespan: '',
      timer: null,
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
    },
    onUnload() {
        clearInterval(this.data.timer);
    },
})