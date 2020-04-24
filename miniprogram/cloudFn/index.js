import cloudFn from './cloudFn'
export default {
  admin:{
    dict:()=>{
      return cloudFn({name:'dict'})
    }
  }
}