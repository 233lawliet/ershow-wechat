var app=getApp()
// pages/myinfo/myinfoNicheng.js
Page({

  /**
   * Page initial data
   */
  data: {
    nicheng:"",
    focus: true,
    user:{},
  },

  /**
   * Lifecycle function--Called when page load
   */
  //修改标题
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
    this.setData({
      user:app.user
    })
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
     this.data.nicheng= e.detail.value;
  },

  //取消
  cancelFunction:function(){
    wx.navigateBack({
      
    })
  },
  //更改
  okFunction:function(){
    var that=this
    wx.request({
      url: 'http://maoerfei.cn/updateUserInfo',
      data:{
        userid: app.user.userid,
        studentid: app.user.studentid,
        nickname: that.data.nicheng
      },
      success(res){
        app.user.nickname = that.data.nicheng;
        wx.navigateBack({
          
        })
        
      }
    })
  }
})