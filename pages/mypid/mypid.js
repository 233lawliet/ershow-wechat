
var app = getApp();
// pages/RandL/RandL.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseFlag: null,  /*true表示登录页面，false表示注册页面*/
    items:[],


  },
  
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //测试
    this.data.user=wx.getStorageSync("user");
    app.user=this.data.user;
    this.leftF()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
 
  leftF: function () {
    this.data.chooseFlag = true
    this.setData({
      chooseFlag: this.data.chooseFlag
    })

    //获取数据
    var that=this
    wx.request({
      url: 'http://localhost:8080/getPidsByBuyer',
      data:{
        buyerid: app.user.userid
      },
      success(res){
        that.data.items=res.data;

        //时间格式化
        for (let i = 0; i < that.data.items.length; i++) {
          //设置时间格式
          var date = new Date(that.data.items[i].pidtime);
          that.data.items[i].pidtime = (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes();
        }

        that.setData({
          items:that.data.items
        });
      }
    })
  },
  rightF: function () {
    this.data.chooseFlag = false
    this.setData({
      chooseFlag: this.data.chooseFlag
    });
    //获取数据
    var that = this
    wx.request({
      url: 'http://localhost:8080/getFoodsOrderBySellerId',
      data: {
        sellerId: app.user.userid
      },
      success(res) {
        that.data.items = res.data;

        //时间格式化
        for (let i = 0; i < that.data.items.length; i++) {
          //设置时间格式
          var date = new Date(that.data.items[i].pidtime);
         // that.data.items[i].pidtime = (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes();
        }

        console.log(that.data.items)
        that.setData({
          items: that.data.items
        });
      }
    })
  },
  

})