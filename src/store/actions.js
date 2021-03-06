import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types"
export default{
  addCart(context,payload){
    const oldProduce = context.state.cartList.find(item => item.iid === payload.iid)
    if(oldProduce){
      context.commit(ADD_COUNTER,oldProduce)
      
    }else{
      payload.count = 1
      context.commit(ADD_TO_CART,payload)
    }
  }
}