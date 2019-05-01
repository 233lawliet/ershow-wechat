// pages/myinfo/myinfoMore.js

var app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    display: [],
    ifDian: false,
    ifLou: false,

    user: {}, 
    //商品
    foodsid:null,
    //评价
    allItems:[],
    comments:"",

  },


  /**
   * Lifecycle function--Called when page load
   */
  
  onLoad: function (options) {

  },

  


  showModel: function () {
    wx.showModal({
      title: '提示：',
      content: '现在登录吧！',
      showCancel: true,
      success(res) {
        if (res.confirm) {
          wx.switchTab({
            url: '',
            url: '/pages/my/my',
          })
        }
      }
    })
  },

  //获取所有的评价
  getAllItems(){
    var that = this;
    wx.request({
      url: 'http://maoerfei.cn/getComments',
      data:{
        foodsid: that.data.foodsid,
      },
      success(res){
        var items=[];
        //
        for (let i = 0; i < res.data.length;i++){
          if (res.data[i].commentobject==-1){
            var info = {
              item: null,
              childItems: [],
            };
            info.item = res.data[i];
            items.push(info);
          }
        }

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].commentobject != -1) {
            for (let j = 0; j < items.length; j++) {
              if (res.data[i].commentobject == items[j].item.commentid){
                items[j].childItems.push(res.data[i]);
              }
            }
          }
        }

        that.data.allItems=items;
        that.setData({
          allItems:that.data.allItems
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
    this.data.user = app.user;
    this.data.foodsid = wx.getStorageSync("item").foodsid;
    this.getAllItems();

    this.setData({
      user:this.data.user,
      foodsid:this.data.foodsid,
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
  

  //模态框的显示
  showDianFunction(e){

    if (app.user == null || app.user == '') {
      this.showModel();
    } else {

      this.data.commentobject=-1;
      this.data.ifDian = true;
      //回复店家
      this.setData({
        ifDian: this.data.ifDian
      })
    }
  },
  showLouFunction(e) {

    if (app.user == null || app.user == '') {
      this.showModel();
    } else {


      this.data.commentobject = e.currentTarget.dataset.commentobject;
      this.data.ifLou = true;
      //回复楼主
      this.setData({
        ifLou: this.data.ifLou
      })
    }
   
  },

  //模态框的取消
  cancel:function(){
    this.data.ifDian=false;
    this.data.ifLou=false;
    this.setData({
      ifDian:this.data.ifDian,
      ifLou:this.data.ifLou
    })
  },



  //数据获取+渲染
  getAllData:function(){
    var that=this
    wx.request({
      url: 'http://maoerfei.cn/getComments',
      data:{
        foodsid:that.data.foodsid,
      },
      success(res){
        //数据渲染
        that.data.allItems=res.data
        that.setData({
          allItems:that.data.allItems
        })
      }
    })
  },

  //增加评论量
  addComments: function (foodsid) {
    var that = this
    wx.request({
      url: 'http://maoerfei.cn/addComments',
      data: {
        foodsid: that.data.foodsid
      }
    })
  },


  //获取评论内容
  setValue:function(e){
    this.data.comments=e.detail.value;
  },
  //数据的提交
  confirm:function(e){
    var that=this;
    wx.request({
      url: 'http://maoerfei.cn/insertComments',
      data:{
        foodsid:that.data.foodsid,
        userid: that.data.user.userid,
        nickname:that.data.user.nickname,
        photo:that.data.user.photo,
        commentobject:that.data.commentobject,
        comments:that.data.comments,
      },
      success(res){
      }
    })

    this.cancel();


    //评论量增加
    this.addComments();


    //重新渲染
    this.onShow();
  },

  
})