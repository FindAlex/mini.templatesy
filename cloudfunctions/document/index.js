// 云函数入口文件
const cloud = require('wx-server-sdk')
const Document = require('./model')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
const $ = _.aggregate
const log = cloud.logger()
// 云函数入口函数
exports.main = async (event, context) => {
  const collection = db.collection("document")
  let documentModel = null
  switch(event.method){
    case 'add':
      documentModel = new Document(event.data, event.method ,db)
      let addRes = await collection.add({
        data: documentModel.getData()
      })
      await documentModel.relevanceDict(addRes._id)
      return addRes
      break
    case 'update':
      documentModel = new Document(event.data,'update',db)
      let updateRes = await collection.doc(event.data._id).update({
        data: documentModel.getData()
      })
      await documentModel.relevanceDict(event.data._id)
      return updateRes
      break  
    case 'del':
      return await collection.doc(event.data._id).remove()
      break
    case 'detail':
      return await collection.doc(event.data._id).get()
      // return await collection.aggregate()
      //           .match({
      //             _id: _.eq(event.data._id)
      //           })
      //           .lookup({
      //             from:'document_dict',
      //             localField:'_id',
      //             foreignField:'documentId',
      //             as:'document_dict'
      //           })
      //           .addFields({
      //             _document_dict: $.map({
      //               input: '$document_dict',
      //               in: '$$this.dictId',
      //             })
      //           })
      //           .lookup({
      //             from:'sys_dict',
      //             localField:'_document_dict',
      //             foreignField:'_id',
      //             as:'dicts'
      //           })
      //           .project({
      //             _document_dict: 0,
      //             document_dict: 0
      //           }).end().then(res=>{
      //             let data = res.list[0] || {}
      //             data.dicts.forEach(dict=>{
      //               if(data[dict.type]){
      //                 data[dict.type].push(dict._id)
      //               }else{
      //                 data[dict.type] = [dict._id]
      //               }
      //             })
      //             delete data.dicts
      //             return {data:data}
      //           })
      break
    default: //get
      return await collection.orderBy('createTime','desc')
                             .orderBy('updateTime','desc')
                             .get()
      break
  }
}