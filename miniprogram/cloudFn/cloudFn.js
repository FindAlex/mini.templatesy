const cloudFn = ({name,data={},config={},success,fail,complete})=>{
  return new Promise((reslove,reject)=>{
    wx.cloud.callFunction({
      name,
      data,
      config,
      success:res=>{
        reslove(res.result.data)
        success && success(res.result.data)
      },
      fail:res=>{
        wx.showModal({
          title:"异常提示",
          content:"云函数调用"+name+"失败，请检查您的网络或稍后再试"
        })
        reject(res)
        fail && fail(res)
      },
      complete:res=>{
        complete && complete(res)
      }
    })
  })
  
}
export default cloudFn