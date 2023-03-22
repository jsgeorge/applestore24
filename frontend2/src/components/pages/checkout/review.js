// Add to store site
//****************************************************************************** */
import React, { useEffect, useState} from "react";
import {Link, useNavigate, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrder} from "../../../actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import { CheckoutStepsComponent } from "../../layout/checkoutSteps";
import {getUserDetails} from "../../../actions/userActions";

export default function ReviewPage(){
    const dispatch = useDispatch()  
    const [order_shipping, setOrdShip] = useState(0.00)
    const [order_total, setOrdTotal] = useState(0.00)
    const [errMsg, setErrMsg] = useState('')
    const userDetails = useSelector(state=>state.userDetails)
    const {error, user} = userDetails
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const ship = useSelector((state) => state.ship)
    const {ordShipping} = ship
    const pay = useSelector((state) => state.pay)
    const {ordPayment} = pay
    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart
    const [sdkReady, setSdkReady] = useState(false)
    const orderCreate = useSelector((state) => state.newOrder)
    const {ord, orderror, success} = orderCreate
    
    const navigate = useNavigate()
    let subtotal = 0
    let shipping = 0
    let total = 0

    cartItems.map(item => {
      subtotal += Number(item.price)
    })
 
   shipping = 15.00
   total = shipping + subtotal

   const addPayPalScript = () =>{
    const script = document.createElement('script')
    script.type = 'text/javasript'
    script.src = 'https://www.paypal.com/sdk/js?client-id=AaUhF9y8Jr1zFNNISvMvCVHLhHxPMSeeBmWNzK8S_V_0bYY7NW7moE797faknx6sYM3RZi5QIV4WOAcp'
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
}


useEffect(()=>{
  if(!userInfo) navigate('/login')
else {
   if (!user) {
     dispatch(getUserDetails('profile'))
   } else{
    setOrdShip(shipping)
    setOrdTotal(total)
    setErrMsg('')

    if(!window.paypal){
      console.log('skdReady', false)
      console.log('papal script doesnt exist')
      console.log('setting paypal script')
      addPayPalScript()
    } else {
      console.log('sdkReady', true)
      setSdkReady(true)
    }


 }}
   },[dispatch, navigate, userInfo, user, shipping, total])
  
   
  //  useEffect(() => {
  //   fetch(APIURL("/account/csrf/"), {
  //     credentials: "include",
  //   })
  //   .then((res) => {
  //     let csrfToken = res.headers.get("X-CSRFToken")
  //     setscrf(csrfToken);
  //     console.log(csrfToken)
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // }, [])


    function DisplayImage(image){
      let imgstr, imgpref, imgsuf, per
        if (image){
          const imgurl = image
          let imgstr
          if (imgurl) {
          const strpos = imgurl.indexOf("images/")+7
           imgstr = imgurl.substring(strpos, imgurl.length)
          }
          if (imgstr.indexOf('_') > 0) {
            let und = imgstr.indexOf('_')
      
            imgpref = (imgstr.substring(0,und))
            per = imgstr.indexOf('.')
            imgsuf = (imgstr.substring(per, imgstr.length))
            imgstr = imgpref + imgsuf
          }
          imgstr = `/images/products/${imgstr}`
          //imgstr = '/images/cars/car-1.jpg'
          return imgstr
        }
        else {
          return 'images/noimg.jpg'
        }
      }
      
    function deleteCartItem(id){
      console.log(id)
    }

    // function onClickEmptyCart(){
     
    // }
    const successPaymentHandler = (paymentResult) => {
      console.log('paypal result', paymentResult)
      // dispatch(addPayment( data, paymentResult))
      // navigate('/checkout/review')
      setErrMsg('')
      console.log("placing order")
      let data = {
         
          cartItems : cartItems,
          ordShipping : ordShipping,
          ordPayment: ordPayment,
          delCost : order_shipping,
          ordTotal : order_total,

      }
   
      // APIpost("POST", `/orders/add/`, data, token['auth-token']) 
      // dispatch(addOrder(
      //   data, token['auth-token'],
      // ))
       dispatch(addOrder( data))

      if (success)
         navigate(`/checkout/orderplaced/`)
      else if (error)
        setErrMsg(error)
    
    }
    
    function onClickCheckout(e){
    
    }
    
    function CartItem(props){
        const {item} = props;   
        return (
         
          <tr>
            <td>
           
            <div className="car-img" style={{width:"100px"}}>
            <img className="d-blocka w-100"   src={DisplayImage(item.image)} alt=""/>
            
              </div></td>

        <td>
       {item.name}<br/>
              $ {item.price} <br/>
              QTY:   {item.qty}                      </td>
              <td> $ {item.price}<br/></td>
              
       </tr>
        )
    }

    
    return (
    
      <div className="page-wrapper">
          <div className="container">
              <CheckoutStepsComponent step="Review" />
              {errMsg && <div className="alert alert-danger" role="alert">{errMsg}</div>}
              <div className="row">
                  <div className="col-md-8 col-sm-8">
                  <div className="row">
                          <div className="col-md-6 col-sm-6">
                                  <h3>Ship To:</h3>
                                  <h6>{ordShipping.firstname} {ordShipping.lastname} <br/>
                                  {ordShipping.address}<br/>
                                  { ordShipping.address2 && <span>{ordShipping.address2 ? ordShipping.address2 : null}<br/> </span>}
                                  {ordShipping.city} {ordShipping.region} {ordShipping.postalcode}<br/>
                                    {ordShipping.country}</h6>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                    <h3>Payment</h3>
                              <h6><strong>Method</strong> {ordPayment.payType} </h6>
                              </div>
                              </div>
                              <div className="cart-table">
                                <h4>Order Items</h4>
                              <table>
                                <thead>
                                  <tr>
                                    <th>Item</th>
                                    <th>Description</th>
                                    <th>Total Price</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                        { cartItems.map(item => (
                        
                          <CartItem key={item.product} item={item} />
                        ))}
                        </tbody>
                       </table>
                       </div>
                       <div>
                       <Link to={'/'} className="btn btn-primary">continue shopping</Link>
                       </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div className="order-summary">
                    <h4>Order Summary</h4>
                  <table>
                <tbody>
                  <tr>
                    <td>Subtotal</td><td>{subtotal}</td>
                  </tr>
                  <tr>
                    <td>shipping</td><td>{shipping}</td>
                  </tr>
                  <tr>
                    <td>Total</td><td>{total}</td>
                  </tr>
               
                </tbody>
              </table>
                 </div>
                  {/* {!sdkReady ? (
                          <span>Loading....<br/></span>
                         ) : ( */}
                            <PayPalButton
                                amount={total}
                                onSuccess={successPaymentHandler}
                            />
                         {/* )}  */}
                      
                  </div>
             </div>
              {/* 
             <div className="row">
                  <div className="col-md-8 col-sm-8">
                      <div className="row">
                          <div className="col-md-6 col-sm-6">
                              <h3>Ship To:</h3>
                                  <h6>{ordShipping.firstname} {ordShipping.lastname} <br/>
                                  {ordShipping.address}<br/>
                                  { ordShipping.address2 && <span>{ordShipping.address2 ? ordShipping.address2 : null}<br/> </span>}
                                  {ordShipping.city} {ordShipping.region} {ordShipping.postalcode}<br/>
                                    {ordShipping.country}</h6>
                       
                          </div>
                          <div className="col-md-6 col-sm-6">
                              <h3>Payment</h3>
                              <h6><strong>Method</strong> {ordPayment.payType} </h6>
                        
                          </div>
                      <div>
                      <table>
                        { cartItems.map(item => (
                        
                          <CartItem key={item.product} item={item} />
                        ))}
                       </table>
                  </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                  <table>
                <tbody>
                  <tr>
                    <td>Subtotal</td><td>{subtotal}</td>
                  </tr>
                  <tr>
                    <td>shipping</td><td>{shipping}</td>
                  </tr>
                  <tr>
                    <td>Total</td><td>{total}</td>
                  </tr>
                  <tr>
                    <td><Link to={'/'} className="btn btn-primary">continue shopping</Link></td>
                  </tr>
                </tbody>
              </table>
                  <span>PayPal buttons</span>
                  
                  </div>  */}
              </div>
        </div>
    
    )

}