// pages/mycollect/mycollect.js
Page({

  /**
   * Page initial data
   */
  data: {
    items:[],
    userid:null,

  },

  //删除收藏的信息
  deleteCollect: function (e) {

    var that = this
    wx.request({
      url: 'http://maoerfei.cn/deleteCollect',
      data: {
        userid: that.data.userid,
        foodsid: e.currentTarget.dataset.foodsid,
      },
      success(res) {
        that.onShow()
      }

    })
  },
  //获取用户的收藏信息
  getCollect: function () {

    var that = this
    wx.request({
      url: 'http://maoerfei.cn/getCollect',
      data: {
        userid: that.data.userid
      },
      success(res) {
        that.data.items = res.data
        that.setData({
          items: that.data.items
        })
      }
    })
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
    this.data.userid = wx.getStorageSync("user").studentid;
    //获取collect信息+渲染
    this.getCollect();
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

  //获取商品详细信息
  getFoodsInfo:function(foodsid){
    
  },

  //商品详情页面
  goDetail: function (e) {
    
    //获取商品的详细信息+写入缓存+跳转
   
    wx.request({
      url: 'http://maoerfei.cn/getFoodsById',
      data: {
        foodsId: e.currentTarget.dataset.foodsid
      },
      success(res) {
        wx.setStorageSync("item", res.data);
        wx.navigateTo({
          url: '/pages/listDetail/listDetail',
        })
      }
    })
    
  },
})