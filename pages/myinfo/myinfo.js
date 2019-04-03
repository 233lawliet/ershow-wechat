// pages/myinfo/myinfo.js
Page({

  /**
   * Page initial data
   */
  data: {
    touxiang: "/images/imgs/lawliet.jpg", //把照片路径存到变量中，
    touxaingHidden: false, //让展示照片的view显示

    nicheng: "",
    qianming: "",
    zhanghao: "这是我的账号",
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.data.qianming = "temp这是我的签名啦"
    this.data.nicheng = "temp昵称"
    wx.setStorageSync("nicheng", "temp昵称")
    wx.setStorageSync("qianming", "temp这是我的签名啦")
    
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.data.nicheng = wx.getStorageSync("nicheng")
    this.data.qianming = wx.getStorageSync("qianming")
    this.setData({
      nicheng: this.data.nicheng,
      qianming: this.data.qianming
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  //调取本地相机-换头像的函数
  changeTouxaingFunction: function () {

    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
        var filePath = res.tempFilePaths[0];
        //将刚才选的照片/拍的 放到下面view视图中
        that.setData({
          touxiang: filePath, //把照片路径存到变量中，
          touxiangHidden: false //让展示照片的view显示
        });
        // 这个是使用微信接口保存文件到数据库
        // wx.uploadFile({
        //   url: "",
        //   filePath: filePath,
        //   name: 'file',
        //   success: function (res) {

        //   }
        // })
      },
      fail: function (error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function () {

      }
    });
  },
  //修改昵称
  changeNichengFunction: function () {

    wx.navigateTo({
      url: '/pages/myinfo/myinfoNicheng',
    })
  },
  //修改签名
  changeQianmingFunction: function () {
    wx.navigateTo({
      url: '/pages/myinfo/myinfoQianming',
    })
  },
  //修改更多的信息
  changeMoreFunction:function(){
    wx.navigateTo({
      url: '/pages/myinfo/myinfoMore',
    })
  }



})