import {
   LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAIL, 
   SIGNUP_USER, SIGNUP_SUCCESS, SIGNUP_FAIL, 
   DETAILS_USER, DETAILS_SUCCESS, DETAILS_FAIL, DETAILS_USER_RESET,
   EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAIL,
   EDIT_PASSWORD_USER, EDIT_PASSWORD_USER_SUCCESS, EDIT_PASSWORD_USER_FAIL,
   ORDERS_USER, ORDERS_USER_SUCCESS, ORDERS_USER_FAIL, ORDERS_USER_RESET,
   USERS_REQUEST,USERS_SUCCESS,USERS_FAIL,
   LOGOUT_USER} from '../constants/userConstants';

 export const userLoginReducer = (state={}, action)=>{
    switch(action.type){
        case  LOGIN_USER:
                return{
                   loading:true
                }
            
        case  LOGIN_SUCCESS:
                return{
                       loading:false,
                       success:true,
                       login:action.payload
                    }
                
        case  LOGIN_FAIL:
                 return{
                           loading:false,
                           error:action.payload
                        
                        }
                    
                  
         case LOGOUT_USER:
               return {}
        default:
            return state
         }
}

export const userSignupReducer = (state={}, action)=>{
   switch(action.type){
       case  SIGNUP_USER:
               return{
                  loading:true
               }
           
       case   SIGNUP_SUCCESS:
               return{
                      loading:false,
                      success:true,
                      user:action.payload
                   }
               
       case   SIGNUP_FAIL:
                return{
                          loading:false,
                          error:action.payload
                       
                       }
                   
      
       default:
           return state
        }
}
export const userUpdateProfileReducer = (state={}, action)=>{
   switch(action.type){
       case  EDIT_USER:
               return{
                  loading:true
               }
           
       case   EDIT_USER_SUCCESS:
               return{
                      loading:false,
                      success:true,
                      user:action.payload
                   }
               
       case   EDIT_USER_FAIL:
                return{
                          loading:false,
                          error:action.payload
                       
                       }
                   
      
       default:
           return state
        }
}
export const userUpdatePasswordReducer = (state={}, action)=>{
   switch(action.type){
       case  EDIT_PASSWORD_USER:
               return{
                  loading:true
               }
           
       case   EDIT_PASSWORD_USER_SUCCESS:
               return{
                      loading:false,
                      success:true,
                      user:action.payload
                   }
               
       case   EDIT_PASSWORD_USER_FAIL:
                return{
                          loading:false,
                          error:action.payload
                       
                       }
                   
      
       default:
           return state
        }
}
export const userDetailsReducer = (state= {user:{}}, action) =>{
   
   switch (action.type){
      case DETAILS_USER:
         return { ...state, loading:true}

      case DETAILS_SUCCESS:
         return {loading:false, user: action.payload}

      case DETAILS_FAIL:
         return {loading: false, error:action.payload}

      case DETAILS_USER_RESET:
         return {user:{}}

      default:
          return state
   }
    
}

export const userOrdersReducer = (state= {loading:true, orders:[]}, action) =>{
   
   switch (action.type){
      case ORDERS_USER:
         return { ...state, loading:true}

      case ORDERS_USER_SUCCESS:
         return {loading:false, orders: action.payload}

      case ORDERS_USER_FAIL:
         return {loading: false, error:action.payload}
      case ORDERS_USER_RESET:
            return {orders:[]}
      
      default:
          return state
   }
    
}

export const usersReducer = (state= {loading:true, users:[]}, action) =>{
   
   switch (action.type){
      case USERS_REQUEST:
         return { ...state, loading:true}

      case USERS_SUCCESS:
         return {loading:false, users: action.payload}

      case USERS_FAIL:
         return {loading: false, error:action.payload}
  
      default:
          return state
   }
    
}