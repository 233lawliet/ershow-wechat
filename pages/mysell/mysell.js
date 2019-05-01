// pages/mysell/mysell.js
var app=getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    user:{},
    
    /*下拉显示类别*/
    array:[],

    name:null,
    type:null,
    info:null,
    image1:"/images/icons/uploadImg.png",
    image2:"/images/icons/uploadImg.png",
    image3:"/images/icons/uploadImg.png",
    imagePath:"http://maoerfei.cn:8000/ershow/",

    price:null,
    hours:null,
    place:null,
  },


  showOkModel: function () {
    wx.showModal({
      title: '恭喜你，拍卖成功',
      content: '现在查看一下我的拍卖吧！',
      showCancel: false,
      success(res) {
        
        if (res.confirm) {
          wx.switchTab({
            
            url: '/pages/mypid/mypid',
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
    var that=this
    wx.request({
      url: 'http://maoerfei.cn/getTypes',
      data:{},
      success(res){
         
        that.data.array=res.data;
        for (let i = 0; i <= res.data.length;i++){
          //svar temp=[]
          //that.data.array.push(temp)
          
        }
        that.setData({
          array:that.data.array
        })
      }
    })

    //渲染用户的信息
    //this.data.user=app.user
    this.data.user = wx.getStorageSync("user");
    this.setData({
      user:this.data.user
    })


    //显示图片

    this.setData({
      image1:this.data.image1,
      image2:this.data.image2,
      image3:this.data.image3
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
  bindPickerChange: function (e) {
    this.data.type = e.detail.value
    this.setData({
      index: e.detail.value
    })
  },
  nameF:function(e){
    this.data.name = e.detail.value;
  },
  infoF:function(e){
    this.data.info = e.detail.value;
  },
  imageF: function (e) {
    this.data.image = e.detail.value;
  },
  priceF: function (e) {
    this.data.price = e.detail.value;
  },
  hoursF: function (e) {
    this.data.hours = e.detail.value;
  },
  placeF: function (e) {
    this.data.place = e.detail.value;
  },
  pid:function(){
    var that=this
    wx.request({
      url: 'http://maoerfei.cn/insertFoods',
      data:{
        foodsname:that.data.name,
        typeid:that.data.type,
        foodsinfo:that.data.info,
        image1:that.data.image1,
        image2: that.data.image2,
        image3: that.data.image3,

        hours:that.data.hours,
        startprice:that.data.price,
        place:that.data.place,

        userid: that.data.user.userid,
        nickname: that.data.user.nickname,

      },
      success(res){
        that.showOkModel();
      }
    })
  },
  //调取本地相机-换头像的函数
  
  chooseImg1:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
        var filePath = res.tempFilePaths[0];
        //将刚才选的照片/拍的 放到下面view视图中
        that.data.image1 = filePath;

        that.setData({
          image1: that.data.image1, //把照片路径存到变量中，
          touxiangHidden: false //让展示照片的view显示
        });
        // 这个是使用微信接口保存文件服务器
        wx.uploadFile({
          url: "http://maoerfei.cn/upload",
          filePath: filePath,
          name: 'file',
          success: function (res) {
            //photo的完整路径
            console.log(that.data.imagePath)
            that.data.image1 = that.data.imagePath + res.data;

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
  chooseImg2: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
        var filePath = res.tempFilePaths[0];
        //将刚才选的照片/拍的 放到下面view视图中
        that.data.image2 = filePath;

        that.setData({
          image2: that.data.image2, //把照片路径存到变量中，
          touxiangHidden: false //让展示照片的view显示
        });
        // 这个是使用微信接口保存文件服务器
        wx.uploadFile({
          url: "http://maoerfei.cn/upload",
          filePath: filePath,
          name: 'file',
          success: function (res) {
            //photo的完整路径
            console.log(that.data.imagePath)
            that.data.image2 = that.data.imagePath + res.data;

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
  chooseImg3: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
        var filePath = res.tempFilePaths[0];
        //将刚才选的照片/拍的 放到下面view视图中
        that.data.image3 = filePath;

        that.setData({
          image3: that.data.image3, //把照片路径存到变量中，
          touxiangHidden: false //让展示照片的view显示
        });
        // 这个是使用微信接口保存文件服务器
        wx.uploadFile({
          url: "http://maoerfei.cn/upload",
          filePath: filePath,
          name: 'file',
          success: function (res) {
            //photo的完整路径
            that.data.image3 = that.data.imagePath + res.data;

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
  }





})