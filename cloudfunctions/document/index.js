// 云函数入口文件
const cloud = require('wx-server-sdk')
const Document = require('./model')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const log = cloud.logger()
// 云函数入口函数
exports.main = async (event, context) => {
  const collection = db.collection("document")
  let formData = null
  switch(event.method){
    case 'add':
      documentModel = new Document(event.data, event.method ,db)
      let addRes = await collection.add({
        data: documentModel.getData()
      })
      await documentModel.relevanceDict(addRes._id)
      log.info({add:addRes})
      return addRes
      break
    case 'update':
      document = new Document(event.data,'update',db)
      let updateRes = await collection.doc(event.data._id).update({
        data: document.getData()
      })
      await documentModel.relevanceDict(event.data._id)
      log.info({update:updateRes})
      return updateRes
      break  
    case 'del':
      return await collection.doc(event.data._id).remove()
      break
    case 'detail':
      return await collection.doc(event.data._id).get()
      break
    default: //get
      return await collection.orderBy('createTime','desc')
                             .orderBy('updateTime','desc')
                             .get()
      break
  }
}