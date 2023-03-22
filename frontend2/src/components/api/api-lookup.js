
import React, {useState, useEffect} from "react";
import { useCookies } from 'react-cookie';
const SERV = 'http://localhost:8000'
//const SERV = 'https://techshedapig.herokuapp.com'

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
    const [token, setToken] = useCookies(['auth-token']);

    useEffect(()=>{
        if (token) {
        async function fetchData(){
            let url = `${SERV}${endpoint}`;
           
            await fetch(url,{
                method: method,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token['auth-token']}`
                }
            })
            .then(resp => resp.json())
            .then(resp => setTable(resp))
            .catch(err => console.log(err))
        }
        fetchData();
    }
    }, [method, token, endpoint]);
    return[table]
    
}

export {APIAuthlookup}

function APIpost(method, endpoint, data, token){
    
   // useEffect(()=>{
        if (token) {
   
        ///async function postData(){
         fetch(`${SERV}${endpoint}`,{
                method: method,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(data)
            })
            // .then(resp => resp.json())
            // .catch(err => console.log(err))
        
        // postData();
     }
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






























