/**
 * <up-pic url="https://j.dns06.net.cn/index.php?m=Api&c=index&a=uploadDownwindxxx" count="3" autoup class='up-pic'></up-pic>
 * 
 * url：上传图片地址
 * count:上传总数量(默认上传1张图片)
 * autoup:是否自动上传(无需传参数,参考以上)
 * 
 * 2019-01-29 MIT
 */

Component({

  data: {
    imgs: [],
    upload_picture_list: [],
    count: 1,
    url: '',
    notli: false
  },
  properties: {
    url: {
      type: String,
      observer(newVal, oldVal) {
        this.data.url = newVal;
      }
    },
    count: {
      type: Number,
      observer(newVal, oldVal) {
        this.data.count = newVal;
      }
    },
    notli: {
      type: Boolean
    }
  },

  methods: {
    chooseImage() {
      cImage(this, parseInt(this.data.count), this.data.url);
    },
    uploadimage() {
      uImage(this, this.data.url);
    },
    deleteImg(e) {
      dImage(e, this);
    },
    previewImg(e) {
      pImage(e, this);
    },
    previewImgs(e) {
      puImage(e, this);
    }
  }

})

// 上传文件
const upload_file_server = (url, _this, upload_picture_list, j) => {
  const upload_task = wx.uploadFile({
    url,
    filePath: upload_picture_list[j]['path'],
    name: 'file',
    "Content-Type": "multipart/form-data",
    formData: {
      'num': j
    },
    success(res) {
      let data = JSON.parse(res.data);

      /**
       * 先获取图片url(各个后端返回值不一，所以造成出入)
       * 
       * 修改获取的图片返回值路径
       * 
       * 
       * 提示：data.info改为你图片返回地址即可
       */
      let filename = data.info; //修改了这里

      upload_picture_list[j]['path_server'] = filename;
      _this.setData({
        upload_picture_list: upload_picture_list
      });
      _this.triggerEvent('upImgData', upload_picture_list);
    }
  })
  upload_task.onProgressUpdate((res) => {
    upload_picture_list[j]['upload_percent'] = res.progress
    _this.setData({
      upload_picture_list: upload_picture_list
    });
  });
}


// 上传图片(this,api.imageup)
const uImage = (_this, url) => {
  // console.log('无法触发')
  for (let j in _this.data.upload_picture_list) {
    if (_this.data.upload_picture_list[j]['upload_percent'] == 0) {
      upload_file_server(url, _this, _this.data.upload_picture_list, j)
    }
  }
}


// 删除图片
const dImage = (e, _this) => {
  _this.data.upload_picture_list.splice(e.currentTarget.dataset.index, 1);
  _this.data.imgs.splice(e.currentTarget.dataset.index, 1);
  _this.setData({
    upload_picture_list: _this.data.upload_picture_list
  });
}


// 选择图片
const cImage = (_this, count, url) => {
  wx.chooseImage({
    count: _this.data.notli ? count = 9 : _this.data.imgs.length == 0 ? count : count - _this.data.imgs.length,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: function(res) {
      _this.data.imgs = _this.data.imgs.concat(res.tempFilePaths)
      for (let i in res.tempFiles) {
        res.tempFiles[i]['upload_percent'] = 0
        res.tempFiles[i]['path_server'] = ''
        _this.data.upload_picture_list.push(res.tempFiles[i]);
        _this.data.upload_picture_list.length > count ? _this.data.upload_picture_list = _this.data.upload_picture_list.slice(0, count) : console.log();
      }!_this.data.notli && count == _this.data.upload_picture_list.length ? uImage(_this, url) : console.log();
      _this.data.notli && count == 9 ? uImage(_this, url) : console.log();
      _this.data.notli ? console.log(`%c up-img提醒您，开启了无限制上传图片模式(单次选择最多9张)`, `color:#f00;font-weight:bold;`) : console.log(`%c up-img提醒您，开启了限制上传图片模式，目标数量为：${count}`, `color:#f00;font-weight:bold;`);
      _this.data.upload_picture_list = _this.data.upload_picture_list.slice(0, count);

      _this.data.imgs = _this.data.imgs.concat(
        res.tempFilePaths).slice(0, count);
      _this.data.upload_picture_list = _this.data.upload_picture_list.slice(0, count);

      _this.setData({
        upload_picture_list: _this.data.upload_picture_list,
      });
    }
  })
}

// 预览图片
const pImage = (e, _this) => {
  wx.previewImage({
    current: _this.data.imgs[e.currentTarget.dataset.index],
    urls: _this.data.imgs
  })
}

// 上传后预览(通用)
const puImage = (e, _this) => {
  wx.previewImage({
    current: _this.data.imgs[e.currentTarget.dataset.idx],
    urls: _this.data.imgs
  })
}