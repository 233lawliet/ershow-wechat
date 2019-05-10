var app=getApp()


// pages/myinfo/myinfo.js
Page({

  /**
   * Page initial data
   */
  data: {
    touxiang: "/images/imgs/lawliet.jpg", //把照片路径存到变量中，
    touxaingHidden: false, //让展示照片的view显示
    
    user:{},

    //系统图片路径
    imgPath: 'http://maoerfei.cn:8000/ershow/'
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
    //this.data.user=app.user;
    this.data.user=app.user;
    this.setData({
      user:this.data.user
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

  //调取本地相机-换头像的函数
  changeTouxaingFunction: function () {

    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
        var filePath = res.tempFilePaths[0];
        //将刚才选的照片/拍的 放到下面view视图中
        that.data.user.photo = filePath;
        
        that.setData({
          user: that.data.user, //把照片路径存到变量中，
          touxiangHidden: false //让展示照片的view显示
        });
        // 这个是使用微信接口保存文件服务器
         wx.uploadFile({
              url: "http://maoerfei.cn/upload",
              filePath: filePath,
              name: 'file',
              success: function (res) {
                //photo的完整路径
                that.data.user.photo = that.data.imgPath + res.data;
                //更新数据库
                wx.request({
                  url: 'http://maoerfei.cn/updateUserInfo',
                  data: {
                    userid: app.user.userid,
                    studentid: app.user.studentid,
                    photo:that.data.user.photo
                  },
                  success(res) {
                    console.log(app.user.userid)
                  }
                })
              }
         })
      },
      fail: function (error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function () {

      }
    });
  },
  //修改昵称
  changeNichengFunction: function () {

    wx.navigateTo({
      url: '/pages/myinfo/myinfoNicheng',
    })
  },
  //修改签名
  changeQianmingFunction: function () {
    wx.navigateTo({
      url: '/pages/myinfo/myinfoQianming',
    })
  },
  //修改更多的信息
  changeMoreFunction:function(){
    wx.navigateTo({
      url: '/pages/myinfo/myinfoMore',
    })
  }



})