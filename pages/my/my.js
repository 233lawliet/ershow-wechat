

var app=getApp()
// pages/my/my.js
Page({

  /**
   * Page initial data
   */
  data: {
    user:{}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://localhost:8080/getUserById',
      data: {
        //studentid: app.user.studentid,
        studentid: 123456,
      },
      success(res) {
        app.user = res.data;
        wx.setStorageSync("user", app.user);
        that.setData({
          user: app.user
        })
      }
    })
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
    //this.data.user=app.user;
    
    
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
  changeInfoFunction:function(){
    wx.navigateTo({
      url: '/pages/myinfo/myinfo',
    })
  }
})