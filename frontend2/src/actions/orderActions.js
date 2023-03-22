//Cart actions module
import axios from 'axios'
import { CART_EMPTY } from '../constants/cartConstants';
import { ADD_SHIPPING, SHIPPING_RESET} from '../constants/orderConstants';
import { ADD_PAYMENT, PAYMENT_RESET } from '../constants/orderConstants';
import { ADD_ORDER, ADD_ORDER_SUCCESS, ADD_ORDER_FAIL,
    ORDER_REQUEST, ORDER_SUCCESS,ORDER_FAIL,
    ORDER_DETAILS, ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL, ORDER_DETAILS_RESET,
    ORDER_SHIPPING, ORDER_SHIPPING_SUCCESS,ORDER_SHIPPING_FAIL, ORDER_SHIPPING_RESET } from '../constants/orderConstants';

export const addShipping =(data)=> async (dispatch, getState) =>{
    
    dispatch({
            type: ADD_SHIPPING,
            payload : {
                firstname : data.firstname,
                lastname : data.lastname,
                address: data.address,
                address2: data.address2,
                city : data.city,
                region : data.region,
                postalcode : data.postalcode,
                country : data.country
            }
    })
            
    localStorage.setItem('ordShipping', JSON.stringify(getState().ship.ordShipping) )

}


export const addPayment =(data)=> async (dispatch, getState) =>{
    console.log('type', data.payType)
    dispatch({
            type: ADD_PAYMENT,
            payload : {
                payType: data.payType,
                payCCNO : data.payCCNO,
                payExp: data.payExp
            }
    })
            
    localStorage.setItem('ordPayment', JSON.stringify(getState().pay.ordPayment) )

}

export const addOrder =(order)=> async (dispatch, getState) =>{

    try {
        
        dispatch({
            type: ADD_ORDER
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
                'http://localhost:8000/api/orders/add/',
                order,
                config
            )
           
            console.log('data', data)
            dispatch({
                type:ADD_ORDER_SUCCESS,
                payload:data
            })
            localStorage.removeItem("cartItems")
            localStorage.removeItem("ordShipping")
            localStorage.removeItem('ordPayment')
           
           dispatch({type: CART_EMPTY})
           dispatch({type: SHIPPING_RESET})
           dispatch({type: PAYMENT_RESET})

         } catch(error){
            dispatch({
                type:ADD_ORDER_FAIL,
                payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
         }
        }

export const getOrder = (id) => async (dispatch, getState) => {
            console.log('action getOrder')
          
          try{
            dispatch({
                type: ORDER_REQUEST
            })
        
            const {
                userLogin: { userInfo },
             } = getState()
            
           
            const config = {
                headers: {
                    'Content-type' : 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        
        
              const { data} = await axios.get(
                `http://localhost:8000/api/orders/view/${id}/`,
                config
        
            )
            
            console.log('orderActions data', data)
            dispatch({
                type: ORDER_SUCCESS,
                payload: data
            })
            } catch(error){
                    dispatch({
                        type:ORDER_FAIL,
                        payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                    })
                 }
        
        }
export const getOrderDetails = (id) => async (dispatch, getState) => {
            console.log('action geOrderDetails')

          try{
            dispatch({
                type: ORDER_DETAILS
            })
            const {
                userLogin: { userInfo },
             } = getState()
        
           
           
            const config = {
                headers: {
                    'Content-type' : 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
            
        
              const { data} = await axios.get(
                `http://localhost:8000/api/orders/details/${id}/`,
                config
        
            )
            console.log('data in orderdetailsAction', data)
            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: data
            })
            } catch(error){
                    dispatch({
                        type:ORDER_DETAILS_FAIL,
                        payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                    })
                 }
        
        }

 