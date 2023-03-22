import { ADD_SHIPPING, SHIPPING_RESET} from '../constants/orderConstants';

 export const shipReducer = (state={ordShipping:{}}, action)=>{
    switch(action.type){
        case  ADD_SHIPPING:
                return{
                    ...state,
                    ordShipping: action.payload
                }
            
        case SHIPPING_RESET:
            return { ordShipping:{}}    
            
        default:
            return state
            }
}