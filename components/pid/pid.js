
// components/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    },
    modalMsg: {
      type: String,
      value: ' ',
    },
    modalTitle: {
      type: String,
      value: ' ',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //隐藏弹框
    hideModal() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    //展示弹框
    showModal() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    _cancelEvent() {
      //触发取消回调
      this.triggerEvent("cancelEvent")
    },
    _confirmEvent() {
      //触发成功回调
      this.triggerEvent("confirmEvent");
    }
  }
})