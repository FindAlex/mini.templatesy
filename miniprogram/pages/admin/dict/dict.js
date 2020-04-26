// miniprogram/pages/admin/dict/dict.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    status:{
      editPopShow: true
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
    app.$cloudFn.admin.dict().then(data=>{
      this.setData({
        list: data
      })
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
  },
  handleTypeChange(e){
    this.setData({
      'form.type':e.detail
    })
  },
  handlePopSave(e){
    let {title,type,value} = e.detail.value
    app.$cloudFn.admin.dict({
      method:'add',
      data:{
        title,type,value
      }
    })
  },
  handlePopDel(){

  }
})