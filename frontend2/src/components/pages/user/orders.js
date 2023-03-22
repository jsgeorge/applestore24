import React, {useEffect, useState}from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import {useDispatch, useSelector} from 'react-redux'
import {getOrder,getOrderDetails} from "../../../actions/orderActions";
import dateFormat from "dateformat";

function DisplayDate(dte){
    return dateFormat(dte, " m/dd/yyyy");
}

export default function OrdersPage(){
    let params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const viewOrder = useSelector(state=>state.viewOrder)
    const {order, error, loading} = viewOrder
    
    const orderDetails = useSelector(state=>state.orderDetails)
    const {items, errorDet, loadingDet} = orderDetails
     
    useEffect(()=>{
        if (!userInfo ) navigate('/login')
      
        if (!order || !order.id){ //} || order._id !== Number(params.id)){
            console.log('order does not exist')
            dispatch(getOrder(params.id)) 
            dispatch(getOrderDetails(params.id)) 
          }
    }, [dispatch, navigate, userInfo, order, items,  params.id])

    
    function DisplayImage(image){
        let imgstr, imgpref, imgsuf, per
          if (image){
            const imgurl = image
            
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

     function OrderItem(props){
            const {item} = props;   
            return (
             <tbody>
              <tr>
                {item.product.product_image[0].image &&
                <td>
               
                <div className="car-img" style={{width:"100px"}}>
                <img className="d-block w-100"   src={DisplayImage(item.product.product_image[0].image)} alt="No Img"/>
                
                  </div></td>}
    
            <td>
            {item.product.name}<br/>
                  $ {item.price} <br/>
                  QTY:   {item.qty}                      </td>
                  <td> Total $ {item.price}<br/></td>
                  
           </tr></tbody>
            )
        }
    
      
   const DisplayOrderDetails = () =>{
    return (
        <div>
            {/* {items && items.length > 0 ?  */}
                    <table>
                    
                        {items.map(ord => (
                
                         <OrderItem  key={ord.id} item={ord} />

                        ))} 
                        
                </table> 
                {/* : <h5>No past orders detils</h5>} */}
        </div>
    )
   }

    return  (
        <div className="page-wrapper">
            <div className="container" id="profile">  
             {!error ? <React.Fragment>
               <div className="page-header">
                <div className="breadcrumbs">
                <Link to={'/user/profile'}>Account</Link>  {'>'} Order Detail
                </div>
                <h4>ORDER SUMMARY</h4>
                <div className="row">
                     <div  className="col-md-4 col-sm-4"><h6><strong>Order#</strong> {params.id}</h6></div>
                     <div className="col-md-4 col-sm-4">  <h6><strong>Order Date:#</strong> {DisplayDate(order.order_date)}</h6></div>
                     <div className="col-md-4 col-sm-4"><h6><strong>Total </strong> ${order.order_total}</h6></div>
                </div> 
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                          <h4>SHIPPING</h4>
                          { order.shipping_address ? <span>
                          <h6>{order.shipping_address.firstname} {order.shipping_address.lastname} <br/>
                     {order.shipping_address.address}<br/>
                     { order.shipping_address.address2 && <span>{order.shipping_address.address2 ? order.shipping_address.address2 : null}<br/> </span>}
                     {order.shipping_address.city} {order.shipping_address.state} {order.shipping_address.zip} {order.shipping_address.country}</h6></span> 
                       : <span><h6>NO shipping address</h6></span>}

                    </div>
                    <div className="col-md-6 col-sm-6">
                      <h4>PAYMENT</h4>
                      <h6><strong>Type</strong> {order.pay_type} <br/>
                      <strong>CCNO</strong> ****{order.pay_ccno && order.pay_ccno.substring(12,16)} <br/>
                      <strong>Exp</strong> {order.pay_exp}</h6>
                      </div>
                  </div>
                   <h4>ORDER ITEMS</h4>
                   <DisplayOrderDetails />
                
             </React.Fragment> : <h5>No past orders</h5>}
        </div>   </div>
    )
 }