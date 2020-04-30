import cloudFn from '../cloudFn/index'
const storageKey ={
  dictSys: 'sys_dict'
}
export const getDictSys = async(code) => {
  let res = wx.getStorageSync(storageKey.dictSys)
  if(res){
    if(code){
      console.log(code)
      return getDictSysCode(res,code)
    }
    return res
  }else{
    const data = await cloudFn.admin.dict()
    if(data){
      wx.setStorage({
        data,
        key: storageKey.dictSys,
      })
    }
    if(code){
      return getDictSysCode(data,code)
    }
    return data
  }
}
const getDictSysCode = (dicts,code) =>{
  return dicts.filter(item=>item.type === code)
}

export const removeStorageDictSys = () =>{
  wx.removeStorageSync(storageKey.dictSys)
}

export const deepCopy = (obj)=>{
  return JSON.parse(JSON.stringify(obj))
}