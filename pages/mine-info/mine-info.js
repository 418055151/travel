const app = getApp()
var windowWRPX = 750
var pageX = 0
var pageY = 0
var pixelRatio = wx.getSystemInfoSync().pixelRatio
var sizeConfPageX = 0
var sizeConfPageY = 0
var initDragCutW = 0
var initDragCutL = 0
var initDragCutH = 0
var initDragCutT = 0
var dragScaleP = 2
Page({
    data: {
        nickname:'程绩',
        searchMask: false,
        gender:'男',
        imageNum: '',
        headImg: '',
        ewmImg: '',
        imageFixed: false,
        imageSrc: '',
        returnImage: '',
        isShowImg: false,
        cropperInitW: windowWRPX,
        cropperInitH: windowWRPX,
        cropperW: windowWRPX,
        cropperH: windowWRPX,
        cropperL: 0,
        cropperT: 0,
        scaleP: 0,
        imageW: 0,
        imageH: 0,
        cutW: 400,
        cutH: 400,
        cutL: 0,
        cutT: 0,
    },
    onLoad: function(options) {

    },
    nickname(event){
        this.setData({
            nickname: event.detail.value
        })
    },
    maskopen(){
        this.setData({
            searchMask:true
        })
    },
    cancel(){
        this.setData({
            searchMask: false
        })
    },
    gender(event){
        var _this = this;
        var gender = event.currentTarget.dataset.gender;
        _this.setData({
            gender: gender
        })
        _this.cancel()
    },
    travel_button(){
        var _this = this;
        if (_this.data.nickname == '' || _this.data.nickname == null)
        {
            wx.showToast({
                title: '昵称不能为空',
                image: '../../imgse/warning-01.png',
                duration: 1000,
                mask: true
            })
            return false
        }
        wx.showToast({
            title: '保存中...',
            icon: 'loading',
            duration: 10000
        })
    },
    dragStart(e) {
        var _this = this
        sizeConfPageX = e.touches[0].pageX
        sizeConfPageY = e.touches[0].pageY
        initDragCutW = _this.data.cutW
        initDragCutL = _this.data.cutL
        initDragCutT = _this.data.cutT
        initDragCutH = _this.data.cutH
    },
    dragMove(e) {
        var _this = this
        var dragType = e.target.dataset.drag
        switch (dragType) {
            case 'right':
                var dragLength = (sizeConfPageX - e.touches[0].pageX) * dragScaleP
                if (initDragCutW >= dragLength) {
                    if (dragLength < 0 && _this.data.cropperW > initDragCutL + _this.data.cutW) {
                        this.setData({
                            cutW: initDragCutW - dragLength
                        })
                    }
                    if (dragLength > 0) {
                        this.setData({
                            cutW: initDragCutW - dragLength
                        })
                    } else {
                        return
                    }
                } else {
                    return
                }
                break;
            case 'left':
                var dragLength = (dragLength = sizeConfPageX - e.touches[0].pageX) * dragScaleP
                if (initDragCutW >= dragLength && initDragCutL > dragLength) {
                    if (dragLength < 0 && Math.abs(dragLength) >= initDragCutW) return
                    this.setData({
                        cutL: initDragCutL - dragLength,
                        cutW: initDragCutW + dragLength
                    })
                } else {
                    return;
                }
                break;
            case 'top':
                var dragLength = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
                if (initDragCutH >= dragLength && initDragCutT > dragLength) {
                    if (dragLength < 0 && Math.abs(dragLength) >= initDragCutH) return
                    this.setData({
                        cutT: initDragCutT - dragLength,
                        cutH: initDragCutH + dragLength
                    })
                } else {
                    return;
                }
                break;
            case 'bottom':
                var dragLength = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
                if (initDragCutH >= dragLength) {
                    if (dragLength < 0 && _this.data.cropperH > initDragCutT + _this.data.cutH) {
                        this.setData({
                            cutH: initDragCutH - dragLength
                        })
                    }
                    if (dragLength > 0) {
                        this.setData({
                            cutH: initDragCutH - dragLength
                        })
                    } else {
                        return
                    }
                } else {
                    return
                }
                break;
            case 'rightBottom':
                var dragLengthX = (sizeConfPageX - e.touches[0].pageX) * dragScaleP
                var dragLengthY = (sizeConfPageY - e.touches[0].pageY) * dragScaleP
                if (initDragCutH >= dragLengthY && initDragCutW >= dragLengthX) {
                    if ((dragLengthY < 0 && _this.data.cropperH > initDragCutT + _this.data.cutH) || (dragLengthY > 0)) {
                        this.setData({
                            cutH: initDragCutH - dragLengthY
                        })
                    }
                    if ((dragLengthX < 0 && _this.data.cropperW > initDragCutL + _this.data.cutW) || (dragLengthX > 0)) {
                        this.setData({
                            cutW: initDragCutW - dragLengthX
                        })
                    } else {
                        return
                    }
                } else {
                    return
                }
                break;
            default:
                break;
        }
    },
    contentStartMove(e) {
        pageX = e.touches[0].pageX
        pageY = e.touches[0].pageY
    },
    contentMoveing(e) {
        var _this = this
        var dragLengthX = (pageX - e.touches[0].pageX) * dragScaleP
        var dragLengthY = (pageY - e.touches[0].pageY) * dragScaleP
        var minX = Math.max(_this.data.cutL - (dragLengthX), 0)
        var minY = Math.max(_this.data.cutT - (dragLengthY), 0)
        var maxX = _this.data.cropperW - _this.data.cutW
        var maxY = _this.data.cropperH - _this.data.cutH
        this.setData({
            cutL: Math.min(maxX, minX),
            cutT: Math.min(maxY, minY),
        })
        pageX = e.touches[0].pageX
        pageY = e.touches[0].pageY
    },
    mine_img(e){
        var _this = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                _this.setData({
                    imageFixed: true,
                    imageSrc: tempFilePaths.join(),
                    imageNum: e.currentTarget.dataset.which
                })
                wx.getImageInfo({
                    src: _this.data.imageSrc,
                    success: function success(res) {
                        var innerAspectRadio = res.width / res.height;
                        if (innerAspectRadio == '1') {
                            _this.setData({
                                imageFixed: false,
                            })
                            if (_this.data.imageNum == '1') {
                                _this.setData({
                                    headImg: tempFilePaths.join()
                                })
                            } else if (_this.data.imageNum == '2') {
                                _this.setData({
                                    ewmImg: tempFilePaths.join()
                                })
                            }
                        } else if (innerAspectRadio > 1) {
                            _this.setData({
                                cropperW: windowWRPX,
                                cropperH: windowWRPX / innerAspectRadio,
                                cropperL: Math.ceil((windowWRPX - windowWRPX) / 2),
                                cropperT: Math.ceil((windowWRPX - windowWRPX / innerAspectRadio) / 2),
                                cutL: Math.ceil((windowWRPX - windowWRPX + 340) / 2),
                                cutT: Math.ceil((windowWRPX / innerAspectRadio - (windowWRPX / innerAspectRadio - 20)) / 2),
                                scaleP: res.width * pixelRatio / windowWRPX,
                                imageW: res.width * pixelRatio,
                                imageH: res.height * pixelRatio
                            })
                        } else {
                            _this.setData({
                                cropperW: windowWRPX * innerAspectRadio,
                                cropperH: windowWRPX,
                                cropperL: Math.ceil((windowWRPX - windowWRPX * innerAspectRadio) / 2),
                                cropperT: Math.ceil((windowWRPX - windowWRPX) / 2),
                                cutL: Math.ceil((windowWRPX * innerAspectRadio - (windowWRPX * innerAspectRadio - 20)) / 2),
                                cutT: Math.ceil((windowWRPX - 340) / 2),
                                scaleP: res.width * pixelRatio / windowWRPX,
                                imageW: res.width * pixelRatio,
                                imageH: res.height * pixelRatio
                            })
                        }
                        _this.setData({
                            isShowImg: true
                        })
                        wx.hideLoading()
                    }
                })
            }
        })
    },
    getImageInfo() {
        var _this = this
        wx.showLoading({
            title: '图片生成中...',
        })
        const ctx = wx.createCanvasContext('myCanvas')
        ctx.drawImage(_this.data.imageSrc)
        ctx.draw(true, () => {
            var canvasW = (_this.data.cutW / _this.data.cropperW) * (_this.data.imageW / pixelRatio)
            var canvasH = (_this.data.cutH / _this.data.cropperH) * (_this.data.imageH / pixelRatio)
            var canvasL = (_this.data.cutL / _this.data.cropperW) * (_this.data.imageW / pixelRatio)
            var canvasT = (_this.data.cutT / _this.data.cropperH) * (_this.data.imageH / pixelRatio)
            wx.canvasToTempFilePath({
                x: canvasL,
                y: canvasT,
                width: canvasW,
                height: canvasH,
                destWidth: canvasW,
                destHeight: canvasH,
                canvasId: 'myCanvas',
                success: function (res) {
                    wx.hideLoading()
                    _this.setData({
                        imageFixed: false,
                    })
                    if (_this.data.imageNum == '1') {
                        _this.setData({
                            headImg: res.tempFilePath
                        })
                    } else if (_this.data.imageNum == '2') {
                        _this.setData({
                            ewmImg: res.tempFilePath
                        })
                    }
                    wx.uploadFile({
                        url: app.data.api + '/userinfo/updateheader',
                        filePath: res.tempFilePath,
                        name: 'file',
                        formData: {
                            "token": _this.data.tokenID,
                        },
                        header: {
                            "Content-Type": "multipart/form-data"
                        },
                        success: function (res) {
                            wx.hideToast();
                            app.data.header = _this.data.headImg
                        },
                        fail: function (res) {
                            wx.hideToast();
                            wx.showModal({
                                title: '错误提示',
                                content: '上传图片失败',
                                showCancel: false,
                                success: function (res) { }
                            })
                        }
                    });

                }
            })
        })
    },
    ChangeBinding: function() {
        wx.navigateTo({
            url: '../boundCellphone/boundCellphone'
        })
    }
})