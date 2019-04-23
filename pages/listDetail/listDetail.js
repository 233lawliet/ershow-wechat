// pages/listDetail/listDetail.js


var app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    item:{},
    seller:{},
    imageList:[],
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
    this.data.imageList=[];
    this.data.imageList.push(this.data.item.image1)
    this.data.imageList.push(this.data.item.image2)
    this.data.imageList.push(this.data.item.image3)
    this.setData({
      imageList:this.data.imageList
    })



    //getUserById获取用户(店家)的信息
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
        that.data.seller = res.data;
        wx.setStorageSync("seller", that.data.seller);
        that.setData({ seller: that.data.seller });
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
  pidsDetail:function(){
    //传递最大竞争者
    wx.setStorageSync("curBuyerId", this.data.item.buyerid);
     wx.navigateTo({
       url: '/pages/listPidList/listPidList',
    })
  },
  pid: function () {

    if(app.user==null||app.user==''){
      this.showModel();
    }else{
      wx.navigateTo({
        url: '/pages/listPid/listPid',
      })  
    }

  },
  comments:function(){
    wx.setStorageSync("foodsid", 563646230 );
    wx.navigateTo({
      url: '/pages/listComment/listComment',
    })
  }

})