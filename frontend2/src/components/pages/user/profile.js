import React, {useEffect, useState}from "react";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import {useDispatch, useSelector} from 'react-redux'
import {getUserDetails} from "../../../actions/userActions";
import {getUserOrders} from "../../../actions/userActions";
import {getOrderDetails} from "../../../actions/orderActions";
import dateFormat from "dateformat";

function DisplayDate(dte){
    return dateFormat(dte, " m/dd/yyyy");
}
export default function ProfilePage(){
    const [name, setname] = useState(null)
    const [email, setEmail] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [username, setUsername] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userDetails = useSelector(state=>state.userDetails)
    const { error, loading, user} = userDetails
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const userOrders = useSelector(state=>state.userOrders)
    const {orders, errorOrd, loadingOrd} = userOrders
   
    useEffect(()=>{
        if (userInfo ) setIsAuth(true)
        if(!userInfo)
            navigate('/login')
        else {
           if (!user || !user.name ){
            
                dispatch(getUserDetails('profile'))
                if (!orders || orders.length === 0)
                dispatch(getUserOrders('user')) 


            } else{

              setname(user.name)
              setEmail(user.email)
             
            }
           
       
        }
    }, [dispatch, navigate, isAuth, userInfo, user, orders])

   
    return (
        <div className="page-wrapper">
            <div className="container" id="profile">
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-4" >
                    <div className="page-header">
            
                    <h4>My Profile</h4>
                </div>
                <label>Name</label>
                <h6>{name}</h6>
                <label>Email</label>
                <h6>{email}</h6>
                <Link to={'/user/edit-profile'} className="btn btn-dark">Edit Profile</Link>
                    </div>

                    <div className="col-md-8 col-sm-8 col-xs-8">
                    <div className="page-header">
            
                    <h4>Past Orders</h4>
                   </div>
                    {orders && orders.length > 0  ? 
                    <table>
                    <thead>
                    <tr>
                        <th>Order#</th>
                        <th>Date</th>
                        <th>Total </th>
                    </tr>
                        </thead>  
                        <tbody>
                         {orders.map(ord => (
                            <tr key={ord.id} style={{borderBottom:"1px solid #aaa", height:"40px", paddng:"10px 0"}}>
                                <td><Link to={`/orders/${ord.id}`}>{ord.id}</Link></td>
                                <td>{DisplayDate(ord.order_date)}</td>
                                <td style={{textAlign:"right"}}> ${ord.order_total}</td>
                            </tr>
                        ))}  
                        
                        </tbody>

                </table> : <h5>No past orders</h5>}  
                </div>
                    </div>
                </div>
              <div className="page-header">
               
            </div>
        </div>     
    )
}