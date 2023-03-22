// Add to store site
//****************************************************************************** */
import React, { useEffect, useState} from "react";
import {Link, useParams, useNavigate, useLocation, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../actions/cartActions";
import {APIpost, APIlookup } from '../../api/api-lookup'
import {useCookies } from 'react-cookie'
import APIURL from '../../api'
import { CheckoutStepsComponent } from "../../layout/checkoutSteps";
export default function ReviewPage(){
  const [order_shipping, setOrdShip] = useState(0.00)
  const [order_total, setOrdTotal] = useState(0.00)
  const [token, setToken, removeCookie] = useCookies(['auth-token']);
  const [csrfToken, setscrf] = useState('')
 
  const ship = useSelector((state) => state.ship)
    const {ordShipping} = ship
    

    const pay = useSelector((state) => state.pay)
    const {ordPayment} = pay
  

    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart

    const navigate = useNavigate()
    

    let subtotal = 0
    let shipping = 0
    let total = 0

    cartItems.map(item => {
      subtotal += Number(item.price)
   })
 
   shipping = 15.00
   total = shipping + subtotal

   useEffect(()=>{
    setOrdShip(shipping)
    setOrdTotal(total)
   },[])
   


    return (
        <div>
  
              <div className="page-wrapper">
                <div className="container">
                  <CheckoutStepsComponent step="Review" />
                  <h3>Order Review</h3> <br/>
           
                  
                  
                   

               
                 
                  </div>
          </div>
        </div>
    )

}