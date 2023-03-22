import React, { useEffect, useContext, useState } from "react";
//import { MyButton } from "../utils/button";
import { Link,  useNavigate } from "react-router-dom";
import {useCookies } from 'react-cookie'
//const SERV = 'http://localhost:8000';
//const SERV = 'https://techshedapig.herokuapp.com'
import {  APIpostUnauth} from "../../api/api-lookup";
import { useDispatch, useSelector } from "react-redux";
import {getUserDetails, updateProfile, updatePassword} from "../../../actions/userActions";

export default function EditProfilePage(){
    // const [token, setToken] = useCookies(['auth-token']);
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} =  userLogin
    const userDetails = useSelector(state=>state.userDetails)
    const { error, loading, user} = userDetails
    const [ errMsg, setErrMsg ] = useState('')
 
    useEffect(()=>{
    
        if(!userInfo) {
           navigate('/login')
        } else {
           if (!user || !user.name ){
            
                dispatch(getUserDetails('profile'))
            } 
            else {
             setFirstName(user.first_name)
             setLastName(user.last_name)
             setUsername(user.username)
             setEmail(user.email)
             }
          }
       }, [userInfo, navigate, dispatch, user])
   
    const onUpdateSubmit = (e) => {
        
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
        let data = {
              username : username,
              first_name : firstName,
              last_name: lastName,
              email : email
        }
        //APIpostUnauth("POST", "/users/update/", data)
        dispatch(updateProfile(firstName, lastName, email, username))
        navigate('/user/profile')
    }
    const onPasswordSubmit = (e) => {
        if (!password)
          setErrMsg("Missing password")
       else if (password !== password2)
           setErrMsg("Password must match")
       else {
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
        let data = {
           
              password: password,
            
        }
        //PIpostUnauth("POST", "/users/update-password/", data)
        dispatch(updatePassword(password))
        navigate('/user/profile')
    }
    }
    return (
        <div>
            
            <div className="container">
            <div className="page-wrapper">
            <div className="row">
              <div className="col-lg-4 col-md-6"></div>
                 <div className="col-lg-4 col-md-6">
           
            { errMsg && <div className="alert alert-danger" role="alert">{errMsg}</div>}
         
       
            <h3 className="page-header">Edit Profile</h3>
          
            {/* <form method="POST" action="#"> */}
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstname" className="form-control" onChange={e=>setFirstName(e.target.value)} value={firstName}/>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastname" className="form-control" onChange={e=>setLastName(e.target.value)} value={lastName}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={e=>setEmail(e.target.value)} value={email}/>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="userid" className="form-control" onChange={e=>setUsername(e.target.value)} value={username}/>
                </div>
                <button type="submit" className="btn btn-theme w-100" onClick={e=>onUpdateSubmit(e)}>Update Profile</button>

                <h4>Update Password</h4>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={e=>setPassword(e.target.value)}/>
                </div>

               
                <div className="form-group">
                    <label>Retype Password</label>
                    <input type="password" name="password2" className="form-control"  onChange={e=>setPassword2(e.target.value)}/>
                </div>
               

                <button type="submit" className="btn btn-theme w-100" onClick={e=>onPasswordSubmit(e)}>Update Password</button>
                
            {/* </form> */}
            <div>
                 
                </div>
                </div>
        </div>
        </div>
        </div>
                </div>

    )
}