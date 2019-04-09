
var app=getApp();
// pages/RandL/RandL.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseFlag:true ,  /*true表示登录页面，false表示注册页面*/  
    account:"",
    password:"",
    repassword:"",
    user:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  accountF:function(e){
    this.data.account = e.detail.value;
  },
  passwordF: function (e) {
    this.data.password = e.detail.value;
  },
  repasswordF: function (e) {
    this.data.repassword=e.detail.value
  },


  loginF:function(){
    this.data.chooseFlag=true
    this.setData({
      chooseFlag:this.data.chooseFlag
    })
  },
  registerF: function () {
    this.data.chooseFlag = false
    this.setData({
      chooseFlag:this.data.chooseFlag
    })
  },
  login:function(){
    console.log("login")
    var that=this;      
    wx.request({
      url: 'http://localhost:8080/checkLogin',
      data:{
        studentid:that.data.account,
        psword:that.data.password
      },
      success(res){
        
        app.user = res.data
        wx.switchTab({
          url: '/pages/list/list',
        });
      }
    });
    
  },
  register:function(){
    console.register("register")
  },

  bottonFunciton:function(){
      if(this.data.chooseFlag){
        this.login()
      }else{
        this.register()
      }
  }

})