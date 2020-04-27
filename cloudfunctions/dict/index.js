// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const collection = db.collection("dict_sys")
  switch(event.method){
    case 'add':
      return await collection.add({
        data: {
          title: event.data.title,
          type: event.data.type,
          value: event.data.value
        }
      })
      break
    case 'update':
      return await collection.doc(event.data._id).update({
        data:{
          title: event.data.title,
          type: event.data.type,
          value: event.data.value
        }
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