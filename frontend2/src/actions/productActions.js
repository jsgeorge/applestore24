import axios from 'axios'
import {RATE_PRODUCT, RATE_PRODUCT_SUCCESS, RATE_PRODUCT_FAIL,
    REVIEW_PRODUCT, REVIEW_PRODUCT_SUCCESS, REVIEW_PRODUCT_FAIL,
    VIEW_REVIEWS, VIEW_REVIEWS_SUCCESS, VIEW_REVIEWS_FAIL, VIEW_REVIEWS_RESET} from "../constants/productConstants"

export const rateProduct = (id,rating)=> async (dispatch, getState) =>{

    try {
        
          dispatch({
            type: RATE_PRODUCT
           })

            const {
                userLogin: {userInfo},
            } = getState()
            
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization : `Bearer ${userInfo.access}`
                }
            }

            console.log('config', config)

            const {data} = await axios.post(
                `http://localhost:8000/api/store/products/${id}/rate/`,
                rating,
                config
            )
           
            console.log('data', data)
            dispatch({
                type:RATE_PRODUCT_SUCCESS,
                payload:data
            })

    } catch(error){
        dispatch({
            type:RATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
     }
    }

export const reviewProduct = (id,review)=> async (dispatch, getState) =>{

        try {
            
              dispatch({
                type: REVIEW_PRODUCT
               })
    
                const {
                    userLogin: {userInfo},
                } = getState()
                
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization : `Bearer ${userInfo.access}`
                    }
                }
    
                console.log('config', config)
    
                const {data} = await axios.post(
                    `http://localhost:8000/api/store/products/${id}/review/`,
                    review,
                    config
                )
               
                console.log('data', data)
                dispatch({
                    type:REVIEW_PRODUCT_SUCCESS,
                    payload:data
                })
    
        } catch(error){
            dispatch({
                type:REVIEW_PRODUCT_FAIL,
                payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
         }
        }
        
export const getProductReviews = (id) => async (dispatch, getState) => {
            console.log('action get product reviews')

          try{
            dispatch({
                type: VIEW_REVIEWS
            })
           
           
            const config = {
                headers: {
                    'Content-type' : 'application/json',
                }
            }
            
        
              const { data} = await axios.get(
                `http://localhost:8000/store/products/${id}/reviews/`,
                config
        
            )
            console.log('data in get reviewsAction', data)
            dispatch({
                type: VIEW_REVIEWS_SUCCESS,
                payload: data
            })
            } catch(error){
                    dispatch({
                        type:VIEW_REVIEWS_FAIL,
                        payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                    })
                 }
        
        }

 