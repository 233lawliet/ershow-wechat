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
    var foodsid = wx.getStorageSync("item").foodsid;
    wx.request({
        url: 'http://maoerfei.cn/getPids',
        data:{
          foodsId: foodsid
        },
        success(res){
          that.data.pids=res.data;
          
          for(let i=0;i<that.data.pids.length;i++){
            //设置时间格式
            var date = new Date(that.data.pids[i].pidtime);
            that.data.pids[i].pidtime =(date.getMonth() + 1) + '-' + date.getDate()+' '+date.getHours()+":"+date.getMinutes();
          
             //设置显示竞价信息
            if (i==0){
              that.data.pids[i].status="领先";
            }else{
             that.data.pids[i].status = "淘汰";
            }
          }
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