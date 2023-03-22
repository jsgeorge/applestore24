// Add to store site
//****************************************************************************** */
import React, { useEffect, useState, useCookies} from "react";
import {Link, useParams, useNavigate, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function OrderPlacedPage(){
  const navigate = useNavigate()

const neworder = useSelector((state) => state.order)
const {result} = neworder.order
console.log(result)
    return (
        <div>
  
              <div className="page-wrapper">
                <div className="container">
                    
                  <h2>  Order Placed successfully. Thank you for your Payment</h2>
                  <h5>Order # {result.id} </h5>
                 <div className="row">
                    <div className="col-md-9 col-sm-9 col-xs-9" >
                    <Link to={'/'} className="btn btn-primary">Back to Main</Link>
                    </div>
                  </div>
                 </div>
          </div>
        </div>
    )

}