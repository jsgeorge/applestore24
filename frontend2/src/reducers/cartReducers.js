import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_EMPTY } from '../constants/cartConstants'

 export const cartReducer = (state={cartItems:[]}, action)=>{
    switch(action.type){
        case  CART_ADD_ITEM:
            const item = action.pyload
            
            
           if (state.cartItems ) {
            const existItem = state.cartItems.find( x=> x.product === action.payload.product )
            
            if( existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x=>
                        x.product === existItem.product ?
                         action.payload : x
                        )
                }
            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems, action.payload]
                }
            
        }
            
    } else {
        return{
            ...state,
            cartItems:[...state.cartItems, action.payload]
        }
    }

    case CART_REMOVE_ITEM:
        if (state.cartItems ) {
    
                return {
                    ...state,
                    cartItems: state.cartItems.filter(x=>
                        x.product !== action.payload.product
                        
                         )
                }
        
    }
        break

    case CART_EMPTY:
         return{ cartItems:[]}

     default:
            return state
    }

}