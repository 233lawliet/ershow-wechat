
var app=getApp()
// pages/list/list.js
Page({

  /**
   * Page initial data
   */
  data: {

    /*轮播数据*/
    imgUrls: [
      'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
      'http://t9.baidu.com/it/u=265726718,565835175&fm=191&app=48&wm=1,17,90,45,20,7&wmo=0,0&n=0&g=0n&f=JPEG?sec=1853310920&t=367cb9090d602fbbf5ae677daacd3b10',
      'http://i0.hdslb.com/bfs/archive/ffe9735cdb517513b7de05d95767eef31abe3da9.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,


    items: [],


  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //用户缓存
    let user= app.user;
    wx.setStorageSync("user", user);
    console.log(user);
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
    var that = this
    wx.request({
      url: 'http://localhost:8080/allFoods',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.data.items = res.data;
        wx.setStorageSync("items", that.data.items);

        that.setData({ items: that.data.items });
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

  },
  addViews:function(foodsid){
    wx.request({
      url: 'http://localhost:8080/addViews',
      data:{
        foodsid:foodsid
      }
    })
  },
  goDetail: function (e) {
    //捕获点击id
    let i = e.currentTarget.dataset.index;
    //准备数据
    let item = this.data.items[i];
    //数据放入缓存
    wx.setStorageSync("item", item);


    //增加页面访问数
    this.addViews(item.foodsid);
    //切换页面
    wx.navigateTo({
      url: '/pages/listDetail/listDetail',
    })
  }
})