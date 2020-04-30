// miniprogram/pages/admin/publish/publish.js
const app = getApp()
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
    },
    fileList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log( this.options._id)
    if(options._id){
      this.data.form._id=options._id
      this.getDetail()
    }
  },
  getDetail(){
    console.log( this.data.form._id)
    app.$cloudFn.admin.document({
      method:'detail',
      data:{
        _id: this.data.form._id
      }
    }).then(res=>{
      this.setData({
        form: res
      })
    })
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
    console.log(e)
    this.setData({
      fileList: e.detail.file
    })
    
  },
  handleSubmit(){
    if(this.data.fileList.length){
      let imgUps = []
      // let oldImgs = [] //TODO 编辑用
      this.data.fileList.forEach(item=>{
        if(item.path){
          imgUps.push(this._cloudUpload(item.path))
        }
      })
      wx.showLoading()
      Promise.all(imgUps).then(res=>{
        this.data.form.images = res.map(item=>item.fileID)
        this._formSubmit()
      }).catch(err=>{
        console.log(err)
        wx.hideLoading()
      })
    }else{
      wx.showLoading()
      this._formSubmit()
    }
  },
  _cloudUpload(path){
    let suffix = path.match(/(?<=\.)([^\.]+)$/g)
    let fileName = new Date().getTime()+''+Math.floor(Math.random()*100+1)
    let cloudPath = `document/${fileName}.${suffix}`
    return wx.cloud.uploadFile({
      cloudPath,
      filePath: path // 文件路径
    })
  },
  _formSubmit(){
    app.$cloudFn.admin.document({
      method: this.data.form._id?'update':'add',
      data: this.data.form
    }).then(res=>{
      wx.hideLoading()
      wx.showToast({
        title: '保存成功',
      })
    }).catch(()=>{
      wx.hideLoading()
    })
  }
})