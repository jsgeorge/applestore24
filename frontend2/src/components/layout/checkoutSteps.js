import React, {useState} from "react";
import {Link } from 'react-router-dom'
import {useCookies } from 'react-cookie'

export function CheckoutStepsComponent({step}){

return (
<React.Fragment>
 {/* Intro section start  */}
<div className="checkout-steps">
    <div className="container">
        <div className="row">
             <div className="col-md-3 col-sm-3"><h4>Checkout</h4></div>
             <div className="col-md-2 col-sm-2">{step === 'Shipping' ? <h6>{step}</h6> : < Link to={'/checkout/shipping'}>Shipping</Link>}</div>
             <div className="col-md-2 col-sm-2">{step === 'Payment' ? <h6>{step}</h6> : < Link to={'/checkout/payment'}>Payment</Link>}</div>
             <div className="col-md-2 col-sm-2">{step === 'Review' ? <h6>{step}</h6> : < Link to={'/checkout/review'}>Review</Link>}</div>
             <div className="col-md-3 col-sm-3">Place Order</div>
        </div>
    </div>
</div>
{/* Intro section end  */}
 

</React.Fragment>
)}