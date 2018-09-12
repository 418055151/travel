let goodsList = [
    { actEndTime: '2018-10-01 10:00:43' },
    { actEndTime: '2018-09-11 11:00:00' },
    { actEndTime: '2018-06-01 12:45:56' },
    { actEndTime: '2018-07-01 15:00:23' },
    { actEndTime: '2018-05-23 17:00:22' },
    { actEndTime: '2018-05-14 19:00:44' },
    { actEndTime: '2018-05-21 21:00:34' },
    { actEndTime: '2018-06-17 09:00:37' },
    { actEndTime: '2018-03-21 05:00:59' },
    { actEndTime: '2018-04-19 07:00:48' },
    { actEndTime: '2018-04-28 03:00:11' }
]
const app = getApp();
var progressNum = 0;
Page({
  data: {
      searchMask:false,
      page: 1,
      size:10,
      datamsg:false,
      dataList:[],
      progress:0,
      countDownList: [],
      actEndTimeList: []
  },
  onLoad: function (options) {
      let endTimeList = [];
      // 将活动的结束时间参数提成一个单独的数组，方便操作
      goodsList.forEach(o => { endTimeList.push(o.actEndTime) })
      this.setData({ actEndTimeList: endTimeList });
      // 执行倒计时函数
      this.countDown();

      
      console.log(app.data)
      var _this = this;
      _this.onReachBottom();
      var timer = setInterval(function () {
          progressNum++;
          //当进度条为100时清除定时任务
          if (progressNum >= 100) {
              clearInterval(timer);
          }
          //并且把当前的进度值设置到progress中
          _this.setData({
              progress: progressNum
          })
      },100)
  },
    onPullDownRefresh: function () {
        var _this = this;
        this.setData({
            page: 1
        })
        wx.showNavigationBarLoading();
        _this.gtemomentList("down")
    },
    onReachBottom: function () {
        var that = this;
        wx.showLoading({
            title: '玩命加载中',
            duration: 2000
        })
        that.gtemomentList("up")
    },
    gtemomentList: function (type){
        var _this = this;
        wx.request({
            url: 'http://ons.me/tools/dropload/json.php?page=' + _this.data.page + '&size=' + _this.data.size,
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                if (res.statusCode == '200') {
                    if (type == 'up') {
                        if(_this.data.page > 2){
                            if(res.data.length == 0){
                                _this.setData({
                                    datamsg: true
                                })
                            }
                        }
                        var dataList = _this.data.dataList;
                        for (var i = 0; i < res.data.length ; i ++){
                            dataList.push(res.data[i])
                        }
                        _this.setData({
                            page: _this.data.page + 1,
                            dataList: _this.data.dataList
                        })
                    } else {
                        var dataList = []
                        for (var i = 0; i < res.data.length; i++) {
                            dataList.push(res.data[i])
                        }
                        _this.setData({
                            page: _this.data.page + 1,
                            dataList: dataList,
                            datamsg: false
                        })
                        wx.stopPullDownRefresh();
                    }
                    wx.hideLoading();
                    wx.hideNavigationBarLoading();
                } else {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        success: function (res) {
                            wx.redirectTo({
                                url: '../login/login'
                            })
                        }
                    });
                }
            }
        })
    },
    onReady: function () {
        this.dialog = this.selectComponent("#dialog");
    },
    _TabFooterNav() {
        this.dialog.TabFooterNav();
    },
    DeleteOrder(){
        var _this = this;
        _this.setData({
            searchMask: true
        })
    },
    cancel(){
        var _this = this;
        _this.setData({
            searchMask: false
        })
    },









    timeFormat(param) {//小于10的格式化函数
        return param < 10 ? '0' + param : param;
    },
    countDown() {//倒计时函数
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime();
        let endTimeList = this.data.actEndTimeList;
        let countDownArr = [];

        // 对结束时间进行处理渲染到页面
        endTimeList.forEach(o => {
            let endTime = new Date(o).getTime();
            let obj = null;
            // 如果活动未结束，对时间进行处理
            if (endTime - newTime > 0) {
                let time = (endTime - newTime) / 1000;
                // 获取天、时、分、秒
                let day = parseInt(time / (60 * 60 * 24));
                let hou = parseInt(time % (60 * 60 * 24) / 3600);
                let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
                let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
                obj = {
                    day: this.timeFormat(day),
                    hou: this.timeFormat(hou),
                    min: this.timeFormat(min),
                    sec: this.timeFormat(sec)
                }
            } else {//活动已结束，全部设置为'00'
                obj = {
                    day: '00',
                    hou: '00',
                    min: '00',
                    sec: '00'
                }
            }
            countDownArr.push(obj);
        })
        // 渲染，然后每隔一秒执行一次倒计时函数
        this.setData({ countDownList: countDownArr })
        setTimeout(this.countDown, 1000);
    }
})