import React from "react";
import {useParams} from "react-router-dom";
import { Banner } from "../layout/banner"
import { ProductsComponentByCtgry, ProductsComponent,CategoryPageComponent, CategoryCarouselComponent} from "../../components/api/products"

export default function ProductsPage(){
    let params = useParams()
    const s = window.location.search;
    const p = new URLSearchParams(s);
    const srchterm = p.get('q');

    return (
          <div className="page-wrapper"> 
                <div className="container">
                    {params.category ? 
                    <ProductsComponentByCtgry ctgry={ params.category} /> :
                      srchterm ?
                        <ProductsComponent  srchTerm={srchterm}/> :
                        <React.Fragment>
                        <CategoryPageComponent />
                        <ProductsComponent /> 
                        </React.Fragment>
                      }
                </div>
            </div> 
  
    )
}