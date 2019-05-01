// pages/pid/pid.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    item:{},
    price:'',
  },

  showModel: function () {
    wx.showModal({
      title: '提示：',
      content: '请保证正确的价格！',
      showCancel: false,
      success(res) {
      }
    })
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
    //获取model组件
    this.modal = this.selectComponent("#modal");

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.item=wx.getStorageSync("item");
    this.data.user = wx.getStorageSync("user");
    this.setData({
      item:this.data.item,
      user:this.data.user
    })
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
  //鼠标响应,时刻监视
  bindKeyInput: function (e) {
    this.data.price = e.detail.value;
  },
  pid:function(e){

    var that = this;
    //输入的价格判定
    if ((that.data.curPrice == null && that.data.price > that.data.item.startprice)|| (that.data.curPrice != null&&that.data.price >that.data.item.curPrice)){
      wx.request({
        url: 'http://maoerfei.cn//pid',
        data: {
          foodsid: that.data.item.foodsid,
          foodsname: that.data.item.foodsname,
          buyerid: that.data.user.userid,
          nickname: that.data.user.nickname,
          pidprice: that.data.price,
          userid: that.data.user.userid
        },
        success(res) {
          //更新价格
          that.data.item.curPrice = that.data.price;
          that.data.item.buyerid = wx.getStorageInfoSync("user").userid;
          wx.setStorageSync("item", that.data.item);
          wx.navigateBack({

          })
        }
      })
    }else{
      that.showModel();
    }
    

   
  }

 
  , showDialog() {
    this.modal.showModal();
  },
  _cancelEvent() {
    this.modal.hideModal();
  },
  //确认事件
  _confirmEvent() {
    this.modal.hideModal();
  }
})