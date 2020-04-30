import cloudFn from './cloudFn'
export default {
  admin:{
    dict:(data)=>{
      return cloudFn({name:'dict',data})
    },
    document:(data)=>{
      return cloudFn({name:'document',data})
    }
  }
}