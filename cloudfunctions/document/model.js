class Document {
  constructor(params, method, db) {
    this.method = method
    this.db = db
    this.data = {}
    if (method === 'add') {
      this.data.createdTime = db.serverDate()
      this.data.updateTime = null
    } else if (method === 'update') {
      this.data.updateTime = db.serverDate()
    }
    this.data.title = params.title || ''
    this.data.description = params.description || ''
    this.data.platform = params.platform || []
    this.data.color = params.color || []
    this.data.industry = params.industry || []
    this.data.images = params.images || []
  }
  getData() {
    return this.data
  }
  relevanceDict(documentId) {
    return new Promise(async (resolve, reject) => {
      this.data._id = documentId
      this.collectionDocumentDict = this.db.collection('document_dict')
      let formData = [
        ...this.data.platform,
        ...this.data.color,
        ...this.data.industry
      ].map(dictId => {
        return {
          documentId,
          dictId
        }
      })
      if (formData.length === 0) {
        resolve()
      }
      if (this.method === 'add') {
        for(let i=0;i<formData.length;i++){
          await this.collectionDocumentDict.add({
            data: formData[i]
          })
        }
        resolve()
      } else if (this.method === 'update') {
        //删除原有的关联
        await this.collectionDocumentDict.where({
          documentId
        }).remove()
        //新增关联：同add
        for(let i=0;i<formData.length;i++){
          await this.collectionDocumentDict.add({
            data: formData[i]
          })
        }
        resolve()
      } else {
        resolve()
      }
    })
  }
}

module.exports = Document