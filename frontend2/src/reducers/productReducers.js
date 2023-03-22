import {RATE_PRODUCT, RATE_PRODUCT_SUCCESS, RATE_PRODUCT_FAIL,
    REVIEW_PRODUCT, REVIEW_PRODUCT_SUCCESS, REVIEW_PRODUCT_FAIL, 
    VIEW_REVIEWS, VIEW_REVIEWS_SUCCESS, VIEW_REVIEWS_FAIL, 
    VIEW_REVIEWS_RESET} from "../constants/productConstants";

export const rateProductReducer = (state={}, action)=>{
    switch(action.type){
        case  RATE_PRODUCT:
                return{
                   loading:true
                }
            
        case  RATE_PRODUCT_SUCCESS:
                return{
                       loading:false,
                       success:true,
                       rtg:action.payload
                    }
                
        case  RATE_PRODUCT_FAIL:
                 return{
                           loading:false,
                           error:action.payload
                        
                        }
                    
                  
       
        default:
            return state
         }
}

export const reviewProductReducer = (state={}, action)=>{
    switch(action.type){
        case  REVIEW_PRODUCT:
                return{
                   loading:true
                }
            
        case  REVIEW_PRODUCT_SUCCESS:
                return{
                       loading:false,
                       success:true,
                       review:action.payload
                    }
                
        case  REVIEW_PRODUCT_FAIL:
                 return{
                           loading:false,
                           error:action.payload
                        
                        }
               
                            
        default:
            return state
         }
}

export const viewReviewsReducer = (state= {loading:true, reviews:[]}, action) =>{
   
    switch (action.type){
       case VIEW_REVIEWS:
          return { ...state, loading:true}
 
       case VIEW_REVIEWS_SUCCESS:
          return {loading:false, items: action.payload}
 
       case VIEW_REVIEWS_FAIL:
          return {loading: false, error:action.payload}
 
       case VIEW_REVIEWS_RESET:
             return {reviews:[]}
    
       default:
           return state
    }
     
 }