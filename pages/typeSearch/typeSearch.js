// pages/search/search.js
Page({

  /**
   * Page initial data
   */
  data: {
    searchData:'',
    items:[],
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
  //鼠标响应,时刻监视
  bindKeyInput: function (e) {
    this.data.searchData = e.detail.value;
    //wx.setStorageSync("searchData", searchData);
    //this.setData({
    // inputValue: searchData
    //})
  },

  getRearchFunction: function () {
    var that = this;
    wx.request({
      url: 'http://maoerfei.cn/getFoodsByName',
      data: {
        name: that.data.searchData
      },
      success(res) {


        that.data.items = []
        //把未过期的数据添加进list
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].exist == true) {
            that.data.items.push(res.data[i])
          }
        }
       
        that.setData({
          items: that.data.items
        })
      }
    })
    //wx.navigateTo({
    //  url: '/pages/typeSearchResult/typeSearchResult',
    //})
  },
  getDetailFunction: function (e) {
    let item = e.currentTarget.dataset.item;
    wx.setStorageSync("item", item);
    wx.navigateTo({
      url: '/pages/listDetail/listDetail',
    })
  },
})