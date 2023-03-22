import React, { useEffect, useContext, useState } from "react";
//import { MyButton } from "../utils/button";
import { Link,  useNavigate } from "react-router-dom";
import {useCookies } from 'react-cookie'
//const SERV = 'http://localhost:8000';
//const SERV = 'https://techshedapig.herokuapp.com'
import {  APIpostUnauth} from "../../api/api-lookup";
import { useDispatch, useSelector } from "react-redux";
import {signup} from "../../../actions/userActions";

export default function RegisterPage(){
    // const [token, setToken] = useCookies(['auth-token']);
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    let errMsg, successMsg;
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} =  userLogin
   
    useEffect(()=>{
    
        if(userInfo) {
           navigate('/')
        }
       }, [userInfo, navigate, dispatch])
   
    const onRegSubmit = (e) => {
        
        // fetch(`${SERV}/api/users/`,{
       
        //     method: 'POST',
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       username : username,
        //       password: password,
        //       first_name : firstName,
        //       last_name: lastName
        //     })
        // })
        // .then(resp => resp.json())
        // .then(resp => navigate('/signin'))
        // .catch(error=>errMsg = "Error" + error
        // let data = {
        //       username : username,
        //       password: password,
        //       firstname : firstName,
        //       lastname: lastName,
        //       email : email
        // }
       // APIpostUnauth("POST", "/users/signup/", data)
       dispatch(signup(firstName, lastName, email, username, password))
        navigate('/login')
    }
    
    return (
        <div>
            
            <div className="container">
            <div className="page-wrapper">
            <div className="row">
              <div className="col-lg-4 col-md-6"></div>
                 <div className="col-lg-4 col-md-6">
           
            { errMsg && <div className="alert alert-danger" role="alert">{errMsg}</div>}
            { successMsg && <div className="alert alert-success" role="alert">{successMsg}</div>}
       
            <h3 className="page-header">Register</h3>
          
            {/* <form method="POST" action="#"> */}
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstname" className="form-control" onChange={e=>setFirstName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastname" className="form-control" onChange={e=>setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="userid" className="form-control" onChange={e=>setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={e=>setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Retype Password</label>
                    <input type="password" name="password2" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={e=>setEmail(e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-theme w-100" onClick={e=>onRegSubmit(e)}>Register</button>
                
            {/* </form> */}
            <div>
                    Existing user?  <Link to={"/signin"} style={{color:'blue'}} >Login</Link>
                </div>
                </div>
        </div>
        </div>
        </div>
                </div>

    )
}