// pages/myinfo/myinfoNicheng.js

var app=getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    qianming:"",
    focus: true

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
   
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
    this.setData({
      autograph: app.user.autograph,
      focus: this.data.focus
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
  //鼠标响应,时刻监视
  bindKeyInput: function (e) {
    this.data.autograph = e.detail.value;
  },

  //取消
  cancelFunction: function () {
    wx.navigateBack({

    })
  },
  //更改
  okFunction: function () {

    var that = this
    wx.request({
      url: 'http://maoerfei.cn/updateUserInfo',
      data: {
        userid: app.user.userid,
        studentid: app.user.studentid,
        autograph: that.data.autograph
      },
      success(res) {
        app.user.autograph = that.data.autograph;
        wx.navigateBack({
        })

      }
    })
    
  }
})