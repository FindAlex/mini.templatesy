const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    code: String,
    defaultValue: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: [],
    valueString: null,
    dictChecked: [],
    dictEnums: [],
    status: {
      popupShow: false
    }
  },
  observers: {
    defaultValue: function () {
      this.defaultValueReset()
    }
  },
  attached() {
    this.getEnums()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    defaultValueReset() {
      let dictChecked = []
      let value = []
      this.data.dictEnums.forEach((item,index) => {
        if(this.data.defaultValue.includes(item._id)){
          dictChecked.push(item)
          value.push(index.toString())
        }
      })
      this.setData({
        value,
        dictChecked,
        valueString: dictChecked.map(item => item.title).join(',')
      })
    },
    getEnums() {
      app.$utils.getDictSys(this.data.code).then(data => {
        this.setData({
          dictEnums: data
        })
        if (!this.data.valueString && this.data.defaultValue.length > 0) {
          this.defaultValueReset()
        }
      })
    },
    popupShow() {
      this.data.valueTemp = app.$utils.deepCopy(this.data.value)
      this.setData({
        'status.popupShow': true
      })
    },
    popupClose() {
      this.setData({
        'status.popupShow': false,
        value: this.data.valueTemp
      })
    },
    popupConfirm() {
      let dictChecked = []
      this.data.value.forEach(item => {
        dictChecked.push(this.data.dictEnums[item])
      })

      this.setData({
        'status.popupShow': false,
        dictChecked,
        valueString: dictChecked.map(item => item.title).join(',')
      })
      this.triggerEvent('change', {
        value: this.data.dictChecked,
        code: this.data.code
      })
    },
    onCheckboxChange(e) {
      this.setData({
        value: e.detail
      })
    }
  }
})