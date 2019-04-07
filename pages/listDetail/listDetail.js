// pages/listDetail/listDetail.js
Page({

  /**
   * Page initial data
   */
  data: {
    item:{},
    user:{},
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
    this.data.item=wx.getStorageSync("items")[0];
    this.setData({
      item:this.data.item
    });
    //getUserById
    var that = this;
    wx.request({
      url: 'http://localhost:8080/getUserById',
      data: {
        userid: that.data.item.userid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.data.user = res.data;
        wx.setStorageSync("user", that.data.user);
        that.setData({ user: that.data.user });
      }
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

  }
})