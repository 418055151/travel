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
        footerSelect: {
            type: Number,
            value: 0
        },
    },

    data: {
        footerNav: [{
                navTitle: '首页',
                navId: '0',
                icon: 'home',
                url: '../index/index'
            },
            {
                navTitle: '我的订单',
                navId: '1',
                icon: 'order',
                url: '../myOrder/myOrder'
            },
            {
                navTitle: '我的',
                navId: '2',
                icon: 'mine',
                url: '../mine/mine'
            }
        ],
    },
    /**
     * 组件的方法列表
     * 更新属性和数据的方法与更新页面数据的方法类似
     */

    methods: {
        // _TabFooterNav: function(event) {
        //     var userid = wx.getStorageSync('userid');
        //     if (userid == '' || userid == null)
        //     {
        //         wx.redirectTo({
        //             url: '../login/login'
        //         })
        //     }else{
        //         var _this = this;
        //         var url = event.currentTarget.dataset.url;
        //         var index = event.currentTarget.dataset.index
        //         wx.redirectTo({
        //             url: url
        //         })
        //         _this.setData({
        //             footerSelect: index
        //         })
        //     }

        // }
        _TabFooterNav: function(event) {
            var _this = this;
            var url = event.currentTarget.dataset.url;
            var index = event.currentTarget.dataset.index
            wx.redirectTo({
                url: url
            })
            _this.setData({
                footerSelect: index
            })

        }
    }
})