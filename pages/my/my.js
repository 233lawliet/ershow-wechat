

var app=getApp()
// pages/my/my.js
Page({

  /**
   * Page initial data
   */
  data: {
    userTemp:{
      photo:'/images/imgs/photo.png',
      nickname:'去登录',
      autograph:'空白',
    },
    user:null
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
    
    //渲染数据
    if(app.user==null||app.user==''){
      this.setData({
        user: this.data.userTemp
      })
    }else{
      
      //填入信息
      this.data.user=app.user;
      wx.setStorageSync("user", app.user);
      this.setData({
        user: this.data.user
      })
    }
  },

  showModel: function (info) {
    wx.showModal({
      title: '提示',
      content: info,
      showCancel: false
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
  changeInfoFunction:function(){
    if (this.data.user.studentid==null||this.data.user.studentid==''){
      wx.navigateTo({
        url: '/pages/RandL/RandL',
      })
    }else{
      wx.navigateTo({
        url: '/pages/myinfo/myinfo',
      })
    }
  },
  myPid: function () {
    if(app.user==null||app.user==''){
      this.showModel("请先登录！");
    }else{
      wx.navigateTo({
        url: '/pages/mysell/mysell',
      })
    }
  },
  loginout:function(){
    app.user="";
    wx.setStorageSync("user", null);
    
    this.data.user=this.data.userTemp
    this.setData({
      user:this.data.userTemp
    })
  }
})