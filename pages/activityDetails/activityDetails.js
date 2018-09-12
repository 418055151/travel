var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
var timestamp = Date.parse(new Date());
Page({
    data: {
        activity:{
            movies:[],
            actName:'',
            actDeadLine:0,
            applicants:0,
            totalNum:0,
            tranFee:0,
            preaidFee:0,
            browseTimes:0
        },
        timespan: '',
        custUser:{
            alias:'',
            ledPersonNum:0,
            phone:'',
            wechat:''
        },
        activityId: '',
        nowData: timestamp,
        starttime: '',
        activityTerminate:false,
        tabSwitch1: true,
        tabSwitch2: true,
        tabSwitch3: true,
        tabSwitch4: true,
        tabSwitch5: true,
        timer: null
    },
    onLoad: function(options) {
        var _this = this;
        _this.setData({
            activityId: options.id,
            starttime: options.actDeadLineString
        })
        wx.request({
            url: app.data.Https + 'activity/detail/' + options.id,
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                console.log(res.data.data)
                if (res.statusCode == '200') {
                    var images = []
                    res.data.data.images.map(function(item, index) {
                        images.push(app.data.imagesUrl + item.url)
                    })
                    var movies = 'activity.movies',
                        actName = 'activity.actName',
                        actDeadLine = 'activity.actDeadLine',
                        applicants = 'activity.applicants',
                        totalNum = 'activity.totalNum',                        
                        tranFee = 'activity.tranFee',
                        preaidFee = 'activity.preaidFee',
                        browseTimes = 'activity.browseTimes',
                        alias = 'custUser.alias',
                        ledPersonNum = 'custUser.ledPersonNum',
                        phone = 'custUser.phone',
                        wechat = 'custUser.wechat'
                    _this.setData({
                        [movies]: images,
                        [actName]: res.data.data.activity.actName,
                        [actDeadLine]: res.data.data.activity.actDeadLine,
                        [applicants]: res.data.data.activity.applicants,
                        [totalNum]: res.data.data.activity.totalNum,
                        [tranFee]: res.data.data.activity.tranFee,
                        [preaidFee]: res.data.data.activity.preaidFee,
                        [browseTimes]: res.data.data.activity.browseTimes,
                        [alias]: res.data.data.custUser.alias,
                        [ledPersonNum]: res.data.data.custUser.ledPersonNum,
                        [phone]: res.data.data.custUser.phone,
                        [wechat]: res.data.data.custUser.wechat
                    })
                    var summary = res.data.data.activity.summary;
                    var scheduling = res.data.data.activity.scheduling;
                    var equipped = res.data.data.activity.equipped;
                    var feeExplain = res.data.data.activity.feeExplain;
                    /** 
                     * WxParse.wxParse(bindName , type, data,target,imagePadding) 
                     * 1.bindName绑定的数据名(必填) 
                     * 2.type可以为html或者md(必填) 
                     * 3.data为传入的具体数据(必填) 
                     * 4.target为Page对象,一般为this(必填) 
                     ** 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选) 
                     */

                    WxParse.wxParse('summary', 'html', summary, _this, 5);
                    WxParse.wxParse('scheduling', 'html', scheduling, _this, 5);
                    WxParse.wxParse('equipped', 'html', equipped, _this, 5);
                    WxParse.wxParse('feeExplain', 'html', feeExplain, _this, 5);
                    if (_this.data.nowData - res.data.data.activity.actDeadLine < 0) {
                        var starttime = new Date(_this.data.starttime);
                        _this.data.timer = setInterval(function() {
                            var nowtime = new Date();
                            var time = starttime - nowtime;
                            var day = parseInt(time / 1000 / 60 / 60 / 24);
                            var hour = parseInt(time / 1000 / 60 / 60 % 24);
                            var minute = parseInt(time / 1000 / 60 % 60);
                            var seconds = parseInt(time / 1000 % 60);
                            _this.setData({
                                timespan: day + "天" + hour + "时" + minute + "分" + seconds + "秒"
                            })
                        }, 1000);
                        _this.setData({
                            activityTerminate: false
                        })
                    }else{
                        _this.setData({
                            timespan: '报名已截止',
                            activityTerminate:true
                        })
                    }

                } else {
                    wx.showModal({
                        title: '提示',
                        content: '网络异常',
                        success: function(res) {
                            wx.redirectTo({
                                url: '../login/login'
                            })
                        }
                    });
                }
            }
        })
    },
    onUnload() {
        clearInterval(this.data.timer);
    },
    tabSwitch1() {
        this.setData({
            tabSwitch1: !this.data.tabSwitch1
        })
    },
    tabSwitch2() {
        this.setData({
            tabSwitch2: !this.data.tabSwitch2
        })
    },
    tabSwitch3() {
        this.setData({
            tabSwitch3: !this.data.tabSwitch3
        })
    },
    tabSwitch4() {
        this.setData({
            tabSwitch4: !this.data.tabSwitch4
        })
    },
    tabSwitch5() {
        this.setData({
            tabSwitch5: !this.data.tabSwitch5
        })
    },
    ActivitiesTermination(){
        wx.showModal({
            title: '提示',
            content: '很抱歉，活动报名已截止！',
            showCancel: false,
            confirmColor: '#3bc983',
            success: function (res) {
                if (res.confirm) {
                } else if (res.cancel) {
                }
            }
        })
    },
    participation:function(event){
        var _this = this;
        var url = event.currentTarget.dataset.url;
        wx.navigateTo({
            url: url
        })
        // var userid = wx.getStorageSync('userid');
        // if (app.data.userid == '' || app.data.userid == null || userid == '' || userid == null)
        // {
        //     wx.reLaunch({
        //         url: '../login/login'
        //     })
        // }else{
        //     wx.navigateTo({
        //         url: url
        //     })
        // }
    },
    previewImage:function(event){
        var current = event.target.dataset.src;
        wx.previewImage({
            current: current, 
            urls: this.data.activity.movies 
        })

    },
    onShareAppMessage: function() {
        return {
            title: '2018.12.15 玉龙湾滑雪活动',
            desc: '2018.12.15 玉龙湾滑雪活动',
            imageUrl: 'http://test.mxlgsl.cn/static//images/wechat/mescroll-empty.png',
            path: 'pages/activityDetails/activityDetails'
        }
    }
})