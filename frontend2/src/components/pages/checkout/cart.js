// Add to store site
//****************************************************************************** */
import React, { useEffect, useState, useCookies} from "react";
import {Link, useParams, useNavigate, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../actions/cartActions";
import { APIlookup } from '../../api/api-lookup'

export default function CartPage(){
    const { slug } = useParams()  
    const navigate = useNavigate()
    const useQty = useLocation()
    const [ordQty, setOrdQty] = useState(1)

   // let params = useParams()
    // const slug = params.slug
    // const id = params.id
    // const qty = params.qty

    //const slug = match.params.slug
    let cartTotal = 0.00
    let subtotal = 0.00
    let shipping = 0.00
    let total = 0.00
    //const  qty = location.search ? Number(location.search.split("=")[1]) :1
  
   // const [token, setToken] = useCookies(['auth-token']);
   // const qty =  location.search ?
     //Number(location.search.split('=')[1]) : 1
   // console.log('qty', qty)
   
   const  qty = useQty.search ? Number(useQty.search.split("=")[1]) :1

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart
    
   
    cartItems.map(item => {
       subtotal += Number(item.price)
    })
  
    shipping = 15.00
    total = shipping + subtotal

    useEffect(()=>{
          if(slug){
             dispatch(addToCart( slug, qty))
          }
         }, [dispatch,  slug,  qty])
    
    
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
      dispatch(removeFromCart(id))
    }

    function onClickEmptyCart(){
     
    }
    function onClickCheckout(e){
    
       
      // APIpost("POST", `/orders/${item.id}/place_order/`,  {qty:qty, complete:true}, token['auth-token']) 
       navigate('/checkout/shipping')
    }
    
    function CartItem(props){
        const {item} = props;
        return (
         <tbody>
          <tr>
            <td>
           
            <div className="car-img" style={{width:"100px"}}>
            <img className="d-blocka w-100"   src={DisplayImage(item.image)} alt=""/>
            
              </div></td>

        <td>
       {item.name}<br/>
              $ {item.price} <br/>
              QTY:   <select  onChange={(e)=>setOrdQty(e.target.value)} value={item.qty} style={{width:"70px",bordpadding:"12px"}}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        </select><br/><br/><br/>
                     </td>
              <td> $ {item.price}<br/><button className="btn btn-light" onClick={()=>deleteCartItem(item.product)}>Remove</button></td>
              
       </tr></tbody>
        )
    }

    function CartColHeadings(){
      return (
        <div className="row cart-col-headings">

        <div className="col-md-7 col-sm-7 col-xs-7">Item</div>
        <div className="col-md-2 col-sm-2 col-xs-2">Total</div>
      
    </div>
   
      )
    }
    
    if ( cartItems[0] === null) return <div className="page-wrapper">
    <div className="container">
      <h2> <i className="fa fa-shopping-cart fa-lg"></i> Shopping Cart</h2>
      <p>Your cart is currently empty</p> 
   </div>
   </div>
    return (
        <div>
  
              <div className="page-wrapper">
                <div className="container">
                  <h2> <i className="fa fa-shopping-cart fa-lg"></i> Shopping Cart ({cartItems.length} items)</h2>
                  {  cartItems.length === 0 ? <React.Fragment>
                     
                    <p>Your cart is currently empty</p> 
                    </React.Fragment> :
                    <React.Fragment>
                    
                 <div className="row">
                    <div className="col-md-9 col-sm-9 col-xs-9" >
                  
                  <CartColHeadings />
                
                    {/* <button className="btn btn-light" onClick={(e)=>onClickEmptyCart(e)}>Empty Cart</button> <Link className="btn btn-light" to="/products">Continue Shopping</Link><br/>
                     */}
                  </div>
                  <table>
                  { cartItems.map(item => (
                  
                   <CartItem key={item.product} item={item} />
                  ))}
                  </table>
                  <table>
                    <tbody>
                      <tr>
                        <td>Subtotal</td><td>${subtotal.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>shipping</td><td>${shipping.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Total</td><td>${total.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td><Link to={'/'} className="btn btn-primary">continue shopping</Link></td><td> <button className="btn btn-theme"  onClick={(e)=>onClickCheckout(e)}>Checkout</button></td>
                      </tr>
                    </tbody>
                  </table>
                    
                
                   
           
                    </div>
                  
                   </React.Fragment> }

               
                 
                  </div>
          </div>
        </div>
    )

}