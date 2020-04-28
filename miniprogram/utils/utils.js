import cloudFn from '../cloudFn/index'
const storageKey ={
  dictSys: 'admin.dict_sys'
}
export const getDictSys = async() => {
  let res = wx.getStorageSync('admin.dict_sys')
  if(res){
    return res
  }else{
    const data = await cloudFn.admin.dict()
    if(data){
      wx.setStorage({
        data,
        key: storageKey.dictSys,
      })
    }
    return data
  }
}

export const removeStorageDictSys = () =>{
  wx.removeStorageSync(storageKey.dictSys)
}