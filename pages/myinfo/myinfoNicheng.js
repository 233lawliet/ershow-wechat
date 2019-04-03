// pages/myinfo/myinfoNicheng.js
Page({

  /**
   * Page initial data
   */
  data: {
    nicheng:"路通",
    focus: true

  },

  /**
   * Lifecycle function--Called when page load
   */
  //修改标题
  onLoad: function(options) {
    this.data.nicheng= wx.getStorageSync("nicheng");
    this.setData({
      nicheng:this.data.nicheng,
      focus:this.data.focus
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },
  //鼠标响应,时刻监视
  bindKeyInput: function (e) {
    this.data.nicheng = e.detail.value;
  },

  //取消
  cancelFunction:function(){
    wx.navigateBack({
      
    })
  },
  //更改
  okFunction:function(){
    
    wx.setStorageSync("nicheng", this.data.nicheng);
    wx.navigateBack({
      
    })
  }
})