// 云函数入口文件
const cloud = require('wx-server-sdk')
const Dict = require('./model')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const collection = db.collection("sys_dict")
  let formData = null
  switch(event.method){
    case 'add':
      dictModel = new Dict(event.data)
      return await collection.add({
        data: dictModel.getData()
      })
      break
    case 'update':
      dictModel = new Dict(event.data)
      return await collection.doc(event.data._id).update({
        data: dictModel.getData()
      })
      break  
    case 'del':
      return await collection.doc(event.data._id).remove()
      break
    default: //get
      return await collection.orderBy('type','desc').get()
      break
  }
 
}