
import React, {useState, getState, useEffect} from "react";
import { useCookies } from 'react-cookie';
import { SERV} from "./index"
//const SERV = 'http://localhost:8000'
import {useDispatch, useSelector} from 'react-redux'

function APIlookup(method, endpoint) { 
    const [table, setTable]  = useState([]);
   
    useEffect(()=>{
        async function fetchData(){
            let url = `${SERV}${endpoint}`;
        
            await fetch(url,{
                method: method,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(resp => setTable(resp))
            .catch(err => console.log(err))
        }
        fetchData();

    }, [method,endpoint]);
    return[table]
    
}

export {APIlookup}

function APIAuthlookup(method, endpoint) { 
    const [table, setTable]  = useState([]);
   // const [token, setToken] = useCookies(['auth-token']);
  const dispatch = useDispatch()
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    useEffect(()=>{
    
        async function fetchData(){
            let url = `${SERV}${endpoint}`;
           
            await fetch(url,{
                method: method,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${userInfo.access}`
                }
            })
            .then(resp => resp.json())
            .then(resp => setTable(resp))
            .catch(err => console.log(err))
        }
        fetchData();
    
    }, [method, userInfo]);
    return[table]
    
}

export {APIAuthlookup}

function APIpost(method, endpoint, data){
    
   // useEffect(()=>{
    const dispatch = useDispatch()
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
   
        ///async function postData(){
         fetch(`${SERV}${endpoint}`,{
                method: method,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.access}`
                },
                body: JSON.stringify(data)
            })
            // .then(resp => resp.json())
            // .catch(err => console.log(err))
        
        // postData();
     
   // }, [method, endpoint, data])
    
    
}

export {APIpost}

function APIpostUnauth(method, endpoint, data){
        const response = fetch(`${SERV}${endpoint}`,{
                  method: method,
                  headers:{
                      'Content-Type': 'application/json',
                      // "X-CSRFToken": csrftoken,
                  },
                  body: JSON.stringify(data)
              })

        return response
             
 }


export {APIpostUnauth}






























