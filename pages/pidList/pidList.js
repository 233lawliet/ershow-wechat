// pages/pidList/pidList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pids:[]
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
    //捕获pids
    var that=this;
    wx.request({
        url: 'http://localhost:8080/getPids',
        data:{
         foodsId : 44545731
        },
        success(res){
          that.data.pids=res.data
          that.setData({
            pids: that.data.pids
          });
        }
      });
    
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

  }
})