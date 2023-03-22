import React, { useEffect, useState } from "react";
import {useParams,Link} from "react-router-dom";
//import { MyButton } from "../utils/button";

export default function NotFoundPage(){
    let params = useParams()
    return (
        <div style={{marginTop:"200px"}}>
              <div className="featured-car content-area">
              <div className="container">
        
            <h1>404</h1>
            <p>Page Not found</p>
            <Link to="/" className="btn btn-danger">Home</Link>
              </div>
          </div>
          
        </div>
    )

}