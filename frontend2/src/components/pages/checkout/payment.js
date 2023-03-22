// Add to store site
//****************************************************************************** */
import React, { useEffect, useState} from "react";
import {Link,  useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutStepsComponent } from "../../layout/checkoutSteps";
import  {addPayment}  from "../../../actions/orderActions";


export default function PaymentPage(){
    const navigate = useNavigate()
    // const [token, setToken, removeCookie] = useCookies(['auth-token']);
    // if (!token['auth-token']) navigate('/login')
    const pay = useSelector((state) => state.pay)
    //const {ordPayment} = 
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const [errMsg, setErrMsg] = useState('')
    const [payType, setPayType] = useState('')
    const [payCCNO, setPayCCNO] = useState('')
    const [payExp, setPayExp] = useState('')

    const dispatch = useDispatch()
   
            
    
   useEffect(()=>{
      if(!userInfo) navigate('/login')
      
    },[dispatch, navigate])

   
    const onClickCheckout = (e) => {
        setErrMsg('')
        if (!payType) setErrMsg("invalid Pay Type")
    
        else  {
            let data = {
              payType: payType
            }
            console.log(data)
            dispatch(addPayment( data))
            navigate('/checkout/review')
       }
      }
    
      
      
      return (
        <div className="page-wrapper">
            <div className="container">
                <CheckoutStepsComponent step="Payment" />
                <div className="row">
                    <div className="col-md-3 col-sm-3"></div>
                    <div className="col-md-6 col-sm-6 col-xs-9" >
                        {errMsg && <div className="alert alert-danger" role="alert">{errMsg}</div>}
                      
                        <div className="form-group">
                        <label>Payment Method</label>
                
                        <select  
                          name="payType" 
                          id="paypal"
                          className="form-control" 
                          onChange={e=>setPayType(e.target.value)} >
                               <option value="" defaultValue>Select</option>
                               <option value="Paypal or CC" >Paypal Or Credit Card</option>
                          </select>
                        </div>
                       
                         <div>
                        <Link to={'/'} className="btn btn-primary">continue shopping</Link> <button className="btn btn-theme"  onClick={(e)=>onClickCheckout(e)}>Checkout</button> 
                          </div>
                     </div>    
                  </div>
                 </div>
          </div>
        
    )

}