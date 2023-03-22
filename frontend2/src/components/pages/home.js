import React from "react";
import { Banner } from "../layout/banner"
import { ProductsBannerComponent, ProductsFeatured2Component, ProductsFeaturedComponent} from "../../components/api/products"

export default function HomePage(){
    localStorage.setItem('admin', false)
    return (
        <div>
              <ProductsBannerComponent category="featured1" />
              <div className="page-wrapper"> 
                   <div className="container">
                   {/* <ProductsCarouselComponent category='toprated' /> */}
                   {/* <ProductsCarouselComponent category='latest' /> */}
                   <ProductsFeatured2Component category="featured2"/>
                   {/* <ProductsFeaturedComponent category="latest"/> */}
                   </div>
                   
              </div> 
        </div>
    )
}