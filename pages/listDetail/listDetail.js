// pages/listDetail/listDetail.js


var app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    imageList: [],
    

    item:{},
    seller:{},
    
    shoucangUrl:"/images/icons/shoucang.png",
    userCollects:[],

    userid:null,
    foodsid:null,
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


 

  //获取收藏的信息
  collect:function(){
    
    var that=this
    wx.request({
      url: 'http://maoerfei.cn/getCollect',
      data:{
        userid:that.data.userid
      },
      success(res) {
        that.data.userCollects=res.data
        for(let i=0;i<that.data.userCollects.length;i++){
          if (that.data.item.foodsid == that.data.userCollects[i].foodsid){
            that.data.shoucangUrl="/images/icons/shoucang2.png"
            break;
          }
        }
       
        that.setData({
          shoucangUrl:that.data.shoucangUrl
        })
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
    var date = new Date(this.data.item.endTime);
    this.data.item.endTime = (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ":" + date.getMinutes();
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


    //当前用户的id
    if (app.user == null || app.user == '') {
      this.data.userid = 0;
    } else {
      this.data.userid = wx.getStorageSync("user").studentid;
    }
    //当前商品的foodsid
    this.data.foodsid = this.data.item.foodsid;

    //收藏按钮的显示
    this.collect();
   

    //getUserById获取用户(店家)的信息
    var that = this;
    wx.request({
      url: 'http://maoerfei.cn/getUserById',
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
    wx.navigateTo({
      url: '/pages/listComment/listComment',
    })
  },

  //增加收藏
  addCollect:function(){
    var that=this
    wx.request({
      url: 'http://maoerfei.cn/insertCollect',
      data:{
        userid:that.data.userid,
        foodsid:that.data.foodsid,
        foodsname:that.data.item.foodsname,
        image:that.data.item.image1
      },
      success(res){
        that.data.shoucangUrl = "/images/icons/shoucang2.png";
        that.setData({
          shoucangUrl :that.data.shoucangUrl 
        })
      }
      
    })
  },
  deleteCollect: function () {
    var that = this
    wx.request({
      url: 'http://maoerfei.cn/deleteCollect',
      data: {
        userid: that.data.userid,
        foodsid: that.data.foodsid
      },
      success(res) {
        that.data.shoucangUrl = "/images/icons/shoucang.png";
        that.setData({
          shoucangUrl: that.data.shoucangUrl
        })
      }

    })
  },

  //点击的收藏按钮
  clickCollect: function () {
    if (app.user == null || app.user == '') {
      this.showModel();
    } else {
      if (this.data.shoucangUrl == "/images/icons/shoucang.png"){
        this.addCollect();
      } else if (this.data.shoucangUrl == "/images/icons/shoucang2.png"){
        this.deleteCollect();
      }
    }
  },
})