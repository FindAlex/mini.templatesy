const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    code: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: [],
    valueString: null,
    dictChecked: [],
    dictEnums: [],
    status:{
      popupShow:false
    }
  },
  attached(){
    this.getEnums()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getEnums(){
      app.$utils.getDictSys(this.data.code).then(data=>{
        this.setData({
          dictEnums: data
        })
      })
    },
    popupShow(){
      this.data.valueTemp = app.$utils.deepCopy(this.data.value)
      this.setData({
        'status.popupShow':true
      })
    },
    popupClose(){
      this.setData({
        'status.popupShow':false,
        value: this.data.valueTemp
      })
    },
    popupConfirm(){
      let dictChecked = []
      this.data.value.forEach(item=>{
        dictChecked.push(this.data.dictEnums[item])
      })
      
      this.setData({
        'status.popupShow':false,
        dictChecked,
        valueString: dictChecked.map(item=>item.title).join(',')
      })
      this.triggerEvent('change',{
        value: this.data.dictChecked,
        code: this.data.code
      })
    },
    onCheckboxChange(e){
      this.setData({
        value: e.detail
      })
    }
  }
})
