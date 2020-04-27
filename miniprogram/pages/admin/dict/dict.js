// miniprogram/pages/admin/dict/dict.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    status:{
      editPopShow: false
    },
    enums:{
      types:['platform','content','color','industry']
    },
    form:{
      title: null,
      type: null,
      value: null
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  getList(){
    wx.showLoading()
    app.$cloudFn.admin.dict().then(data=>{
      this.setData({
        list: data
      })
    }).finally(()=>{
      wx.hideLoading()
    })
  },
  handleEdit(e){
    const {index} = e.target.dataset
    const item = this.data.list[index]
    this.setData({
      form: {...item}
    })
    this.editPopShow()
  },
  formClear(){
    this.setData({
      form:{
        title: null,
        type: null,
        value: null
      }
    })
  },
  editPopShow(){
    this.setData({
      'status.editPopShow': true
    })
  },
  editPopClose(){
    this.setData({
      'status.editPopShow': false
    })
    this.formClear()
  },
  handleTypeChange(e){
    this.setData({
      'form.type':e.detail
    })
  },
  handlePopSave(e){
    let {title,type,value} = e.detail.value
    let formData = {
      title,type,value
    }
    if(this.data.form._id){
      formData._id = this.data.form._id
    }
    wx.showLoading()
    app.$cloudFn.admin.dict({
      method:this.data.form._id?'update':'add',
      data:formData
    }).then(()=>{
      wx.hideLoading()
      wx.showToast({
        title: '提交成功'
      })
      this.getList()
      this.editPopClose()
    }).catch(()=>{
      wx.hideLoading()
    })
  },
  handlePopDel(){
    if(!this.data.form._id){
      return
    }
    wx.showLoading()
    app.$cloudFn.admin.dict({
      method:'del',
      data:{
        _id: this.data.form._id
      }
    }).then(()=>{
      wx.hideLoading()
      wx.showToast({
        title: '删除成功'
      })
      this.getList()
      this.editPopClose()
    }).catch(()=>{
      wx.hideLoading()
    })
  }
})