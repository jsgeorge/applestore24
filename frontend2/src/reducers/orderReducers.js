import { ADD_ORDER, ADD_ORDER_SUCCESS, ADD_ORDER_FAIL,
   ORDER_REQUEST, ORDER_SUCCESS,ORDER_FAIL,ORDER_RESET, 
    ORDER_DETAILS, ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL, ORDER_DETAILS_RESET,
   } from '../constants/orderConstants';

 export const newOrderReducer = (state={}, action)=>{
    switch(action.type){
        case  ADD_ORDER:
                return{
                   loading:true
                }
            
        case  ADD_ORDER_SUCCESS:
                return{
                       loading:false,
                       success:true,
                       ord:action.payload
                    }
                
        case  ADD_ORDER_FAIL:
                 return{
                           loading:false,
                           error:action.payload
                        
                        }
                    
                  
       
        default:
            return state
         }
}
export const orderReducer = (state= {loading:true, order:{}}, action) =>{
   
   switch (action.type){
      case ORDER_REQUEST:
         return { ...state, loading:true}

      case ORDER_SUCCESS:
         return {loading:false, order: action.payload}

      case ORDER_FAIL:
         return {loading: false, error:action.payload}

      case ORDER_RESET:
            return {order:{}}
   
      default:
          return state
   }
    
}
export const orderDetailsReducer = (state= {loading:true, items:[]}, action) =>{
   
   switch (action.type){
      case ORDER_DETAILS:
         return { ...state, loading:true}

      case ORDER_DETAILS_SUCCESS:
         return {loading:false, items: action.payload}

      case ORDER_DETAILS_FAIL:
         return {loading: false, error:action.payload}

      case ORDER_DETAILS_RESET:
            return {items:[]}
   
      default:
          return state
   }
    
}

