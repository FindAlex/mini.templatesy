const cloudFn = ({name,data={},config={},success,fail,complete})=>{
  return new Promise((reslove,reject)=>{
    wx.cloud.callFunction({
      name,
      data,
      config,
      success:res=>{
        console.log(res)
        reslove(res.result.data)
        success && success(res.result.data)
      },
      fail:res=>{
        wx.showModal({
          title:"云函数异常",
          content:`【${name}】模块，错误：${res}`
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