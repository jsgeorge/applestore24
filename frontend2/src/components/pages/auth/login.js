import React, { useEffect, useContext, useState } from "react";
//import { MyButton } from "../utils/button";
import { Link, useNavigate } from "react-router-dom";
import {useCookies } from 'react-cookie'
import { APIpostUnauth} from "../../api/api-lookup";
import {login} from '../../../actions/userActions'
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage(){
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    // const [token, setToken] = useCookies(['auth-token']);
    const [errMsg, setErrMsg] = useState()
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} =  userLogin
     

     useEffect(()=>{
    
     if(userInfo) {
        navigate('/')
     }
    }, [userInfo, navigate, dispatch])

    const Login =()=>{
 //    let resp = APIpostUnauth("POST", '/auth/', data)

    //    if (resp.token)
    //       setToken('auth-token',resp.token)
    //    else console.log("Login error")
        // setToken('auth-token',  APIpostUnauth("POST", '/auth/', data))
        // console.log(token['auth-token'])
        // navigate("/")
        // fetch(`${SERV}/api/auth/`,{
        //     method: 'POST',
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username:username,
        //         password:password
        //     })
        // })
        // APIpostUnauth("POST", '/users/login/', {username:username,password:password})
        // .then(resp => resp.json())
        // // .then(resp => setToken('auth-token', resp.token))
        // .catch(error=>setErrMsg("Error" + error))
        dispatch(login(username, password))
        navigate('/')
    }

    const onLoginSubmit = (e) => {
        setErrMsg("")
        // console.log(username,password)
        if(!username) setErrMsg("Error missing Username");
        else if(!password) setErrMsg("Missing Password");
        else Login()
        console.log(errMsg)
    }
    return (
        <div>
            
            <div className="container">
                <div className="page-wrapper">
              <div className="row">
              <div className="col-lg-4 col-md-3"></div>
              <div className="col-lg-4 col-md-6">
             <div className="form">
  
             { errMsg && <div className="alert alert-danger" role="alert">{errMsg}</div>}
           
       
            <h3 className="page-header">Sign in</h3>
            {/* <form method="POST" onSubmit={e=>onLoginSubmit(e)}> */}
                <div className="form-group">
                    <label>Userid</label>
                    <input type="text" required name="userid" className="form-control" onChange={e=>setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" required name="password" className="form-control" onChange={e=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-theme w-100" onClick={e=>onLoginSubmit(e)}>Login</button>
                <div>
                    Not registerd?  <Link to={"/signup"} style={{color:'blue'}} >Register</Link>
                </div>
            {/* </form> */}
            </div>
            </div>
        </div>
        </div>
        </div>
        </div>
    )
}