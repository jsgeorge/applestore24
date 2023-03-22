import { ADD_PAYMENT, PAYMENT_RESET} from '../constants/orderConstants';

 export const payReducer = (state={ordPayment:{}}, action)=>{
    switch(action.type){
        case  ADD_PAYMENT:
        
                return{
                    ...state,
                    ordPayment: action.payload
                }
        case PAYMENT_RESET:
            return { ordPayment:{}}    
             
        default:
            return state
         }
}