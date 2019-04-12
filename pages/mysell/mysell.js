// pages/mysell/mysell.js
var app=getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    user:{},
    
    /*下拉显示类别*/
    array:[],

    name:null,
    type:null,
    info:null,
    image:null,

    price:null,
    hours:null,
    place:null,
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
    var that=this
    wx.request({
      url: 'http://localhost:8080/getTypes',
      data:{},
      success(res){
        console.log(res)
        that.data.array=res.data;
        for (let i = 0; i <= res.data.length;i++){
          //svar temp=[]
          //that.data.array.push(temp)
          
        }
        that.setData({
          array:that.data.array
        })
      }
    })

    //渲染用户的信息
    //this.data.user=app.user
    this.data.user = wx.getStorageSync("user");
    this.setData({
      user:this.data.user
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
  bindPickerChange: function (e) {
    this.data.type = e.detail.value
    this.setData({
      index: e.detail.value
    })
  },
  nameF:function(e){
    this.data.name = e.detail.value;
  },
  infoF:function(e){
    this.data.info = e.detail.value;
  },
  imageF: function (e) {
    this.data.image = e.detail.value;
  },
  priceF: function (e) {
    this.data.price = e.detail.value;
  },
  hoursF: function (e) {
    this.data.hours = e.detail.value;
  },
  placeF: function (e) {
    this.data.place = e.detail.value;
  },
  pid:function(){
    var that=this
    wx.request({
      url: 'http://localhost:8080/insertFoods',
      data:{
        foodsname:that.data.name,
        typeid:that.data.type,
        foodsinfo:that.data.info,
        image1:that.data.image,
        
        hours:that.data.hours,
        startprice:that.data.price,
        place:that.data.place,

        userid: that.data.user.userid,

      },
      success(res){
        console.log(res)
      }
    })
  }
})