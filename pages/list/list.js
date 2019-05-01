
var app=getApp()
// pages/list/list.js
Page({

  /**
   * Page initial data
   */
  data: {

    /*轮播数据*/
    imgUrls: [
      'http://maoerfei.cn:8000/ershow/index2.png',
      'http://i0.hdslb.com/bfs/archive/ffe9735cdb517513b7de05d95767eef31abe3da9.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,


    items: [],


  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //用户缓存
    let user= app.user;
    wx.setStorageSync("user", user);
   
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
      url: 'http://maoerfei.cn/allFoods',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        that.data.items=[]
        //把未过期的数据添加进list
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].exist ==true){
            that.data.items.push(res.data[i])
          }
        }

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
      url: 'http://maoerfei.cn/addViews',
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