let wxTools = require('../../utils/wxTools.js')
const app = getApp();
var timestamp = Date.parse(new Date());
let lazyload;
Page({
    data: {
        indexNav: [{
                navTitle: '全部',
                navId: '',
                page: 1,
                emptyData: false,
                datamsg: false,
                activity: []
            },
            {
                navTitle: '本周活动',
                navId: 'week',
                page: 1,
                emptyData: false,
                datamsg: false,
                activity: []
            },
            {
                navTitle: '下周活动',
                navId: 'nextWeek',
                page: 1,
                emptyData: false,
                datamsg: false,
                activity: []
            },
            {
                navTitle: '本月活动',
                navId: 'month',
                page: 1,
                emptyData: false,
                datamsg: false,
                activity: []
            }
        ],
        imagesUrl: '',
        size: 10,
        nowData: timestamp,
        catalogSelect: 0,
        timeSelect: '',
        scrollLeft: 0,
        winHeight: "",
        loadMore: true,



        scrollData: {
            offetHeight: 0, // px
            height: 255, // px
            colunm: 1
        },
        showIndex: 0
    },
    scrollHide(e) {
        let data = [
            this.data.scrollData.offetHeight,
            e.detail.scrollTop,
            this.data.scrollData.height,
            this.data.scrollData.colunm
        ]
        let index = wxTools.countIndex(...data)

        this.setData({
            showIndex: index
        })
    },
    onLoad: function(options) {
        var _this = this;
        //  高度自适应
        wx.getSystemInfo({
            success: function(res) {
                var clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                var calc = clientHeight * rpxR;
                console.log(calc)
                _this.setData({
                    winHeight: calc,
                    imagesUrl: app.data.imagesUrl
                });
            }
        });
        _this.onReachBottom();
    },
    // 滚动切换标签样式
    switchTab: function(e) {
        var _this = this;
        _this.setData({
            catalogSelect: e.detail.current,
            timeSelect: _this.data.indexNav[e.detail.current].navId,
            emptyData: false,
        });
        this.checkCor();
        if (_this.data.indexNav[_this.data.catalogSelect].page <= 1) {
            _this.onReachBottom();
        }
        if (_this.data.indexNav[_this.data.catalogSelect].activity.length > _this.data.size) {
            _this.setData({
                datamsg: false
            })
        } else {
            _this.setData({
                datamsg: true
            })
        }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function() {
        if (this.data.currentTab > 4) {
            this.setData({
                scrollLeft: 300
            })
        } else {
            this.setData({
                scrollLeft: 0
            })
        }
    },
    TabNav: function(event) {
        var _this = this;
        var NavIndex = event.currentTarget.dataset.index;
        var NavId = event.currentTarget.dataset.id;
        _this.setData({
            catalogSelect: NavIndex
        })
    },
    onReady: function() {
        this.authorization = this.selectComponent("#authorization");
    },
    _TabFooterNav() {
        this.dialog.TabFooterNav();
    },
    _DownRefresh: function() {
        this.onPullDownRefresh();
    },
    onPullDownRefresh: function() {
        wx.setNavigationBarTitle({
            title: '刷新中...'
        })
        var _this = this;
        wx.showLoading({
            title: '玩命加载中',
        })
        var page = 'indexNav[' + _this.data.catalogSelect + '].page';
        console.log(page)
        _this.setData({
            [page]: 1
        })
        wx.showNavigationBarLoading();
        wx.stopPullDownRefresh();
        setTimeout(function() {
            _this.gtemomentList("down")
        }, 500);
    },
    onReachBottom: function() {
        var _this = this;
        wx.showLoading({
            title: '玩命加载中',
        })
        setTimeout(function() {
            _this.gtemomentList("up")
        }, 300);
    },
    gtemomentList: function(type) {
        var _this = this;
        _this.setData({
            loadMore: false
        })
        wx.request({
            url: app.data.Https + 'activity/list?time=' + _this.data.timeSelect + '&page=' + _this.data.indexNav[_this.data.catalogSelect].page + '&size=' + _this.data.size,
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                if (res.statusCode == '200' || res.message == 'Ok') {
                    var list_item = _this.data.indexNav[_this.data.catalogSelect];
                    var page = 'indexNav[' + _this.data.catalogSelect + '].page';
                    var dataMsg = 'indexNav[' + _this.data.catalogSelect + '].datamsg';
                    var emptyData = 'indexNav[' + _this.data.catalogSelect + '].emptyData';
                    if (type == 'up') {
                        if (_this.data.indexNav[_this.data.catalogSelect].page != 1) {
                            if (JSON.stringify(res.data.data) != '{}') {
                                _this.setData({
                                    [emptyData]: false,
                                })
                                if (res.data.data.list.length == _this.data.size) {
                                    _this.setData({
                                        [dataMsg]: false
                                    })
                                } else {
                                    _this.setData({
                                        [dataMsg]: true
                                    })
                                }
                            } else {
                                _this.setData({
                                    [emptyData]: true,
                                })
                            }
                            list_item.activity = list_item.activity;
                            res.data.data.list.map(function(item, index) {
                                list_item.activity.push(item)
                            })
                            _this.setData({
                                indexNav: _this.data.indexNav,
                            })
                        } else {
                            if (JSON.stringify(res.data.data) != '{}') {
                                _this.setData({
                                    [emptyData]: false,
                                })
                                if (res.data.data.list.length == _this.data.size) {
                                    _this.setData({
                                        [dataMsg]: false
                                    })
                                } else {
                                    _this.setData({
                                        [dataMsg]: true
                                    })
                                }
                                list_item.activity = list_item.activity;
                                res.data.data.list.map(function(item, index) {
                                    list_item.activity.push(item)
                                })
                                _this.setData({
                                    indexNav: _this.data.indexNav,
                                })
                            } else {
                                _this.setData({
                                    [emptyData]: true,
                                    [dataMsg]: false
                                })
                            }
                        }
                        var num = _this.data.indexNav[_this.data.catalogSelect].page + 1
                        _this.setData({
                            [page]: num
                        })
                    } else if (type == 'down') {
                        if (_this.data.indexNav[_this.data.catalogSelect].page != 1) {} else {
                            if (JSON.stringify(res.data.data) != '{}') {
                                _this.setData({
                                    [emptyData]: false
                                })
                                if (res.data.data.list.length == _this.data.size) {
                                    _this.setData({
                                        [dataMsg]: false
                                    })
                                } else {
                                    _this.setData({
                                        [dataMsg]: true
                                    })
                                }
                                var activity = 'indexNav[' + _this.data.catalogSelect + '].activity';
                                var list_item = [];
                                res.data.data.list.map(function(item, index) {
                                    list_item.push(item)
                                })
                                _this.setData({
                                    [activity]: list_item
                                })
                            } else {
                                _this.setData({
                                    [emptyData]: true,
                                    [dataMsg]: false
                                })
                            }
                        }
                        _this.setData({
                            [page]: 2
                        })
                        wx.stopPullDownRefresh();
                        wx.setNavigationBarTitle({
                            title: '游游侠'
                        })
                    }
                    wx.hideLoading();
                    wx.hideNavigationBarLoading();
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
                _this.setData({
                    loadMore: true,
                })
            }
        })
    },
    onShareAppMessage: function() {
        return {
            title: '游游侠',
            desc: '游游侠',
            imageUrl: 'http://test.mxlgsl.cn/static//images/wechat/mescroll-empty.png',
            path: 'pages/activityDetails/activityDetails'
        }
    }
})