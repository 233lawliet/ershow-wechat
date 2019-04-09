//同步请求头文件

const app = getApp();
var common = require('../../utils/common.js');
var util = require('../../utils/util');
var wxrequest = util.wxPromisify(wx.request)

// pages/type/type.js
Page({

  /**
   * Page initial data
   */
  data: {
    curSelectType: 0,  //背景色
    curTypeId: '001',
    types: [],
    itemImgUrl: 'https://wxwaimai.oss-cn-huhehaote.aliyuncs.com/kyq',
    items: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //在返回的result使用this
    var that = this;
    //同步请求
    wxrequest({
      url: 'http://localhost:8080/getTypes',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      }
    }).then(res => {
      that.data.types = res.data
      that.setData({
        types: that.data.types
      });
      //选择item
      that.getAllTypeFunction(that.data.curTypeId);
    });


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
  //点击改变type
  clickTypeFunction: function (e) {

    this.data.curSelectType = e.currentTarget.dataset.index;
    this.data.curTypeId = this.data.types[this.data.curSelectType].typeid;
    //背景白色
    this.setData({
      curSelectType: this.data.curSelectType,
    })
    //设置id
    this.getAllTypeFunction(this.data.curTypeId);
  },

  //所有item进行分类显示
  getAllTypeFunction: function (typeid) {
    //清空分类
    this.data.items.splice(0, this.data.items.length);
    //数据分类
    let items = wx.getStorageSync("items");
    for (let i = 0; i < items.length; i++) {
      if (items[i].typeid== typeid) {
        this.data.items.push(items[i]);
      }
    }

    this.setData({
      items: this.data.items
    })
  },
  getDetailFunction: function (e) {
    let item = e.currentTarget.dataset.item;
    wx.setStorageSync("item", item);
    wx.navigateTo({
      url: '/pages/listDetail/listDetail',
    })
  },
  goSearchFunction: function () {
    wx.navigateTo({
      url: '/pages/typeSearch/typeSearch',
    })
  }


})