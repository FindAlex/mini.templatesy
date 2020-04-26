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
          tilte: event.data.title,
          type: event.data.type,
          value: event.data.value
        }
      })
      break
    case 'del':
      break
    case 'update':
      break  
    case 'get':  
    default: //get
      return await db.collection("dict_sys").get()
      break
  }
 
}