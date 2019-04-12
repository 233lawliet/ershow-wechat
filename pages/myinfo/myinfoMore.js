// pages/myinfo/myinfoMore.js

var app=getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    display1: "none",
    display2: "none",
    display3: "none",
    user:{},

    //关于性别的radio
    gender:[
      {
        name: "0",
        value: "女",
        checked: false
      },
      { 
        name:"1",
        value:"男",
        checked:false,
      },
    ]
  },

 
  stustudentidF: function (e) { this.data.user.stustudentid = e.detail.value;},
  passwordF: function (e) { this.data.user.psword = e.detail.value;},
  phoneF: function (e) { this.data.user.phone = e.detail.value;},
  emailF: function (e) { this.data.user.email= e.detail.value;},
  nameF: function (e) { this.data.user.username = e.detail.value;},
  radioChange(e) {
    this.data.user.gender = e.detail.value
  },
  birthdayF: function (e) { this.data.user.age = e.detail.value;},
  address1F: function (e) { this.data.user.address1 = e.detail.value;},
  address2F: function (e) { this.data.user.address2 = e.detail.value;},
  universityF: function (e) { this.data.user.university = e.detail.value;},
  schoolF: function (e) { this.data.user.school = e.detail.value;},
  majorF: function (e) { this.data.user.major = e.detail.value;},
  classF: function (e) { this.data.user.classname = e.detail.value;},
  stageF: function (e) { this.data.user.stage = e.detail.value; },
  dormF: function (e) { this.data.user.dorm = e.detail.value;},
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
    this.data.user=app.user
    this.data.gender[this.data.user.gender].checked=true //性别渲染
    this.setData({
      user:this.data.user,
      gender:this.data.gender
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

    var that=this;

    //传输时，有些值不允许为null,设置默认值
    if (this.data.user.phone == null || this.data.user.phone==''){
      this.data.user.phone=0;
    }
    if (this.data.user.gender == null || this.data.user.gender == '') {
      this.data.user.gender = 1;
    }
    if (this.data.user.age == null || this.data.user.age == '') {
      this.data.user.age = 0;
    }
    wx.request({
      url: 'http://localhost:8080/updateUserInfo',
      data:{
        studentid: this.data.user.studentid,
        psword:  this.data.user.psword,
        phone: this.data.user.phone,
        email:this.data.user.email,
        username: this.data.user.username ,
        gender:  this.data.user.gender ,
        age:this.data.user.age ,
        address1:  this.data.user.address1 ,
        address2: this.data.user.address2 ,
        university: this.data.user.university ,
        school: this.data.user.school ,
        major:this.data.user.major ,
        classname: this.data.user.classname ,
        stage:this.data.user.stage,
        dorm:this.data.user.dorm ,
      },
      success(res){
        app.user=that.data.user
        wx.navigateBack({
          
        })
      }
    })
    
  }
})