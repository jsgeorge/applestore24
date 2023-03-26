//Cart actions module
import axios from 'axios'
import {  
    LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAIL, 
    SIGNUP_USER, SIGNUP_SUCCESS, SIGNUP_FAIL, 
    DETAILS_USER, DETAILS_SUCCESS, DETAILS_FAIL, DETAILS_USER_RESET,
    EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAIL,
    EDIT_PASSWORD_USER, EDIT_PASSWORD_USER_SUCCESS, EDIT_PASSWORD_USER_FAIL,
    ORDERS_USER, ORDERS_USER_SUCCESS, ORDERS_USER_FAIL, ORDERS_USER_RESET,
    USERS_REQUEST,USERS_SUCCESS,USERS_FAIL,
    LOGOUT_USER } from '../constants/userConstants';
import { ORDER_RESET, ORDER_DETAILS_RESET } from '../constants/orderConstants';
import { SERV } from '../components/api';

export const login = (username, password)=> async (dispatch) =>{
    try {  
        dispatch({
            type: LOGIN_USER
           })

            const config = {
                headers: {
                    'Content-type': 'application/json',
                }
            }
            const {data} = await axios.post(
                //'http://localhost:8000/api/users/login/',
                `${SERV}/api/users/login/`,
                {'username': username, 'password': password},
                config
            )
           
            dispatch({
                type:LOGIN_SUCCESS,
                payload:data
            })
       
            localStorage.setItem('userInfo', JSON.stringify(data))
            
         } catch(error){
            dispatch({
                type:LOGIN_FAIL,
                payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
         }
        }
    

export const signup = (firstname,lastname, email, username, password)=> async (dispatch) =>{
            try {  
                dispatch({
                    type: SIGNUP_USER
                   })
        
                    const config = {
                        headers: {
                            'Content-type': 'application/json',
                        }
                    }
                    const {data} = await axios.post(
                        //'http://localhost:8000/api/users/signup/',
                        `${SERV}/api/users/signup/`,
                        {   
                            'firstname' : firstname,
                            'lastname' : lastname,
                            'email' : email,
                            'username': username, 
                            'password': password,
                        },
                        config
                    )
                   
                    console.log(' in signup action', data)

                    dispatch({
                        type:SIGNUP_SUCCESS,
                        payload:data
                    })
               

                    
                 } catch(error){
                    dispatch({
                        type:SIGNUP_FAIL,
                        payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                    })
                 }
                }

                
export const updateProfile = (firstname,lastname, email, username)=> async (dispatch, getState) =>{
    try {  
        dispatch({
            type: EDIT_USER
           })

           const {
            userLogin: { userInfo },
         } = getState()
    
       
            const config = {
                headers: {
                    'Content-type': 'application/json',
                     Authorization: `Bearer ${userInfo.access}`
                }
            }
            const {data} = await axios.post(
                //`http://localhost:8000/api/users/update-profile/`,
                `${SERV}/api/users/update-profile/`,
                {   
                    'firstname' : firstname,
                    'lastname' : lastname,
                    'email' : email,
                    'username': username, 
                  },
                config
            )
           
           
            dispatch({
                type:EDIT_USER_SUCCESS,
                payload:data
            })
       

            
         } catch(error){
            dispatch({
                type:EDIT_USER_FAIL,
                payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
         }
        }
export const updatePassword = (password)=> async (dispatch, getState) =>{
            try {  
                dispatch({
                    type:EDIT_PASSWORD_USER
                   })
        
                   const {
                    userLogin: { userInfo },
                 } = getState()
            
               
                    const config = {
                        headers: {
                            'Content-type': 'application/json',
                             Authorization: `Bearer ${userInfo.access}`
                        }
                    }
                    const {data} = await axios.post(
                       // `http://localhost:8000/api/users/update-password/`,
                        `${SERV}/api/users/update-password/`,
                        {   
                            'password': password, 
                          },
                        config
                    )
                   
                   
                    dispatch({
                        type:EDIT_PASSWORD_USER_SUCCESS,
                        payload:data
                    })
               
        
                    
                 } catch(error){
                    dispatch({
                        type:EDIT_PASSWORD_USER_FAIL,
                        payload: error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
                    })
                 }
                }
export const getUserDetails = (id) => async (dispatch, getState) => {
    console.log('action getUerDetails')
  try{
    dispatch({
        type: DETAILS_USER
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
        //`http://localhost:8000/api/users/${id}/`,
        `${SERV}/api/users/${id}/`,
        config

    )
   
    dispatch({
        type: DETAILS_SUCCESS,
        payload: data
    })
    } catch(error){
            dispatch({
                type:DETAILS_FAIL,
                payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
         }

}
export const getUserOrders = (id) => async (dispatch, getState) => {
    console.log('action getUserOrders')
    dispatch({type:ORDER_RESET})
    dispatch({type:ORDER_DETAILS_RESET})
  try{
    dispatch({
        type: ORDERS_USER
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
        //`http://localhost:8000/api/orders/${id}/`,
        `${SERV}/api/orders/${id}/`,
        config

    )
    
    dispatch({
        type: ORDERS_USER_SUCCESS,
        payload: data
    })
    } catch(error){
            dispatch({
                type:ORDERS_USER_FAIL,
                payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
         }

}

export const getUsers = (id) => async (dispatch, getState) => {
    console.log('action getUsers')
   
  try{
    dispatch({
        type: USERS_REQUEST
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
        //`http://localhost:8000/api/users/`,
        `${SERV}/api/users/`,
        config

    )
    
    dispatch({
        type: USERS_SUCCESS,
        payload: data
    })
    } catch(error){
            dispatch({
                type:USERS_FAIL,
                payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
            })
         }

}
export const logout = (dispatch) =>{
    localStorage.removeItem("cartItems")
    localStorage.removeItem("ordShipping")
    localStorage.removeItem('ordPayment')
    localStorage.removeItem('userInfo')

    dispatch({type:LOGOUT_USER})
    dispatch({type:DETAILS_USER_RESET})
    dispatch({type:ORDERS_USER_RESET})
    dispatch({type:ORDER_RESET})
    dispatch({type:ORDER_DETAILS_RESET})
}