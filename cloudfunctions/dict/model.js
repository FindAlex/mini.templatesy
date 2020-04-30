class Dict{
  constructor(params){
    this.data = {}
    this.data.title = params.title
    this.data.type = params.type
    this.data.value = params.value
  }
  getData(){
    return this.data
  }
}

module.exports = Dict