const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getList()
    },

    getList() {
        wx.showLoading()
        app.$cloudFn.admin.document().then(data => {
            this.setData({
                list: data
            })
        }).finally(() => {
            wx.hideLoading()
        })
    },
    onPullDownRefresh(){
      this.getList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})