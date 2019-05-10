
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
  showModel: function (info) {
    wx.showModal({
      title: '提示',
      content: info,
      showCancel:false
    })
  },
  showRegisterModel:function(){
    wx.showModal({
      title: '恭喜你，注册成功！',
      content: '现在去完善个人信息吧。',
      showCancel: false,
      success(res){
        if(res.confirm){
          wx.navigateTo({
            url: '/pages/myinfo/myinfo',
          })
        }
      }
    })
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
  
  login:function(){
    var that=this;      
    wx.request({
      url: 'http://maoerfei.cn/checkLogin',
      data:{
        studentid:that.data.account,
        psword:that.data.password
      },
      success(res){
        if(res.data==null||res.data==''){
          that.showModel("账号或密码错误！");
        }else{
          app.user = res.data,
          wx.switchTab({
            url: '/pages/my/my',
          });
        }
        
      }
    });
  },
  register:function(){
    if(this.data.password!=this.data.repassword){
      this.showModel("两次密码不一致！");
    }else {
      var that = this;
      wx.request({
        url: 'http://maoerfei.cn/checkAccount',
        data: {
          studentid: that.data.account
        },
        success(res) {
          //数据插入
          if(res.data==0){
            wx.request({
              url: 'http://maoerfei.cn/insertUser',
              data: {
                studentid: that.data.account,
                psword: that.data.password
              },
              success(res) {
                //用户信息获取
                wx.request({
                  url: 'http://maoerfei.cn/checkLogin',
                  data: {
                    studentid: that.data.account,
                    psword: that.data.password
                  },
                  success(res) {
                   app.user = res.data
                  }
                });
                that.showRegisterModel();
              }
            })
          }else{
            that.showModel("账号已存在");
          }
        }
      })
    }
  },
  loginF: function () {
    this.data.chooseFlag = true
    this.setData({
      chooseFlag: this.data.chooseFlag
    })
  },
  registerF: function () {
    this.data.chooseFlag = false
    this.setData({
      chooseFlag: this.data.chooseFlag
    })
  },
  bottonFunciton:function(){
      if(this.data.chooseFlag){
        this.login()
      }else{
        this.register()
      }
  }

})