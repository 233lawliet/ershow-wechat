
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
  

  showModel: function (info) {
    wx.showModal({
      title: '提示：',
      content: info,
      showCancel: false,
      success(res) {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/my/my',
          })
        }
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //测试
    this.data.user=app.user;
    if (app.user == null || app.user == '') {
      this.showModel("请先登录！");
    } else {
      app.user = this.data.user;
      this.leftF()
    }
    
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
      url: 'http://maoerfei.cn/getPidsByBuyer',
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
          
          //获取商品的详细信息
          wx.request({
            url: 'http://maoerfei.cn/getFoodsById?',
            data: {
              foodsId: that.data.items[i].foodsid
            },
            success(res) {
              that.data.items[i].foods = res.data;
              that.setData({
                items: that.data.items
              });
            }
          })
          that.data.items[i].display = 'none';
        }  

        
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
      url: 'http://maoerfei.cn/getFoodsOrderBySellerId',
      data: {
        sellerId: app.user.userid
      },
      success(res) {

        that.data.items = res.data;

        if (that.data.items.length==0){
          that.setData({
            items: that.data.items
          });
          return ;
        }
        //时间格式化
        for (let i = 0; i < that.data.items.length; i++) {
          //设置时间格式
          that.data.items[i].display='none';

          wx.request({
            url: 'http://maoerfei.cn/getFoodsById?',
            data: {
              foodsId: that.data.items[i].foodsid
            },
            success(res) {
              that.data.items[i].foods = res.data;


              //foods里的起拍时间
              var date = new Date(that.data.items[i].foods.starttime);
              that.data.items[i].foods.starttime = (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes();

              var date = new Date(that.data.items[i].foods.endTime);
              that.data.items[i].foods.endTime = (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes();
              that.setData({
                items: that.data.items
              });
            }
          })
          
        }

       
      }
    })
  },
  getMoreFunction: function (e) {
    if (this.data.items[e.currentTarget.dataset.index].display == 'none') {
      this.data.items[e.currentTarget.dataset.index].display = ''
    } else {
      this.data.items[e.currentTarget.dataset.index].display= 'none'
    }
    this.setData({
      items: this.data.items
    })
  },


  //获取商品的信息
  getFoodsInfo:function(foodsid){
    wx.request({
      url: 'http://maoerfei.cn/getFoodsById?',
      data:{
        foodsId:foodsid
      },
      success(res){
        return res.data;
      }
    })
    
  }, 
  //查看物品详情
  getDetailFunction: function (e) {
    let item = e.currentTarget.dataset.item;
    wx.setStorageSync("item", item);
    wx.navigateTo({
      url: '/pages/listDetail/listDetail',
    })
  },

  

})