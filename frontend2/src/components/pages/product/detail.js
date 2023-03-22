import React from "react";
import {useParams} from "react-router-dom";
import  {ProductDetailComponent} from "../../api/products";

export default function AutoDetailPage(){
    let params = useParams()
    
    return (
        <div>
            <div className="container">     
                <ProductDetailComponent slug={params.slug} />  
            </div>
        </div>     
    )
}