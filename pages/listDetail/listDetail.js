// pages/listDetail/listDetail.js
Page({

  /**
   * Page initial data
   */
  data: {
    item:{},
    user:{},
    imageList:[],
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
    this.data.item=wx.getStorageSync("item");
    this.setData({
      item:this.data.item
    });

    //商品图片集合+渲染
    this.data.imageList.push(this.data.item.image1)
    this.data.imageList.push(this.data.item.image2)
    this.data.imageList.push(this.data.item.image3)
    this.setData({
      imageList:this.data.imageList
    })

    //getUserById获取用户的信息
    var that = this;
    wx.request({
      url: 'http://localhost:8080/getUserById',
      data: {
        userid: that.data.item.userid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.data.user = res.data;
        wx.setStorageSync("user", that.data.user);
        that.setData({ user: that.data.user });
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

  }
})