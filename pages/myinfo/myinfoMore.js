// pages/myinfo/myinfoMore.js
Page({

  /**
   * Page initial data
   */
  data: {
    display1: "none",
    display2: "none",
    display3: "none"
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

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
  //获取子项的信息
  getMoreFunction1: function() {
    if (this.data.display1 == 'none') {
      this.data.display1 = ''
    } else {
      this.data.display1 = 'none'
    }
    this.setData({
      display1: this.data.display1
    })
  },
  //获取子项的信息
  getMoreFunction3: function() {
    if (this.data.display3 == 'none') {
      this.data.display3 = ''
    } else {
      this.data.display3 = 'none'
    }
    this.setData({
      display3: this.data.display3
    })
  },
  //获取子项的信息
  getMoreFunction2: function() {
    if (this.data.display2 == 'none') {
      this.data.display2 = ''
    } else {
      this.data.display2 = 'none'
    }
    this.setData({
        display2: this.data.display2
      })
  },
  //取消返回
  cancelFunction:function(){
    wx.navigateBack({
      
    })
  },
    //修改信息函数
  changeFunction: function () {
    wx.navigateBack({

    })
  }
})