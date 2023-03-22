import React, { useEffect,  useState } from "react";
//import { MyButton } from "../utils/button";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {getUsers} from "../../../../actions/userActions";
import {getUserDetails} from "../../../../actions/userActions";

export default function AdminDashboardPage(){
 
    const [errMsg, setErrMsg] = useState()
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} =  userLogin
    const userList = useSelector(state => state.userList)
    const {users} =  userList
     

     useEffect(()=>{
    if(!userInfo || !userInfo.isAdmin) navigate('/admin')
    else {
     if(!users || users.length === 0) {
         dispatch(getUsers())
     }
     
    }}, [userInfo, navigate, dispatch,users])

        return (
        <div>
            
            <div className="container">
                <div className="page-wrapper">
              <div className="row">
              <div className="col-lg-4 col-md-3" style={{backgroundColor:"#eee"}}><h3>Dashboard</h3>
                <ul>
                    <li>User Accounts</li>
                    <li>Sales Orders</li>
                    <li>Inventory</li>
                    <li>Reports</li>
                </ul></div>
              <div className="col-lg-4 col-md-6">
                <h3>USERS</h3>
              {users && users.length > 0  ? 
                    <table>
                    <thead>
                    <tr>
                         <th>ID#</th>
                        <th>Name</th>
                        <th>username </th>
                        <th>type</th>
                    </tr>
                        </thead>  
                        <tbody>
                         {users.map(usr => (
                            <tr key={usr.id} style={{busrerBottom:"1px solid #aaa", height:"40px", paddng:"10px 0"}}>
                                <td><Link to={`/users/${usr.id}`}>{usr.id}</Link></td>
                                <td>{usr.name}</td>
                    
                                <td > {usr.username}</td>
                                <td > {usr.isAdmin ? <span>Staff</span> : <span>Customer</span>}</td>
                            </tr>
                        ))}  
                        
                        </tbody>

                </table> : <h5>No past users</h5>}  
             </div>
        </div>
        </div>
        </div>
        </div>
    )
}