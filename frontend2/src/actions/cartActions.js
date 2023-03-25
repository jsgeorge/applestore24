//Cart actions module
import { CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants';
import axios from 'axios';
import { SERV } from '../api';
export const addToCart=(slug, qty)=> async (dispatch, getState) =>{
    
   //const {data} = await axios.get( `http://localhost:8000/api/store/products/${slug}/`)
   const {data} = await axios.get( `${SERV}/api/store/products/${slug}/`)
    dispatch({
            type: CART_ADD_ITEM,
            payload : {
                product: data.id, 
                name: data.name,
                price : data.regular_price,
                discount: data.discount_price,
                image: data.product_image[0].image,
                qty: qty
            }
    })
            
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems) )

}


export const removeFromCart=(id)=> async (dispatch, getState) =>{
    
     dispatch({
             type: CART_REMOVE_ITEM,
             payload : {
                 product: id, 
        }
     })
             
     localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems) )
 
 }
 
 //    try {
//     await fetch(`http://localhost:8000/api/products/${slug}/`)
//    .then(data => data.json())
//    .then( data => dispatch({
//         type: CART_ADD_ITEM,
//         payload : {
//             product: data._id, 
//             name: data.name,
//             price : data.regular_price,
//             discount : data.discount_price,
          
//         }
        
//    }))