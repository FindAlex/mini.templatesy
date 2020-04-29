// miniprogram/pages/admin/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      title: null,
      description: null,
      platform: [],
      color: [],
      industry: [],
      images: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleFormChange(e){
    const {field} = e.target.dataset
    this.data.form[field] = e.detail
  },
  dictChange(e){
    const {code,value} = e.detail
    this.data.form[code] = value.map(item=>item._id)
  },
  handleUploadAfterRead(e){
    let path = e.detail.file.path
    let suffix = path.match(/(?<=\.)([^\.]+)$/g)
    let cloudPath = 'document/'+new Date().getTime()+'.'+suffix
    console.log(cloudPath)
    // wx.cloud.uploadFile({
    //   cloudPath: `document/.png`,
    //   filePath: e.detail.file.path, // 文件路径
    //   success: res => {
    //     // get resource ID
    //     console.log(res.fileID)
    //   },
    //   fail: err => {
    //     // handle error
    //   }
    // })
  }
})