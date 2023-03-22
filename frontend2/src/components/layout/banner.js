import React from "react";
import {Link }from 'react-router-dom';

export function Banner(){
    return  ( 
     <React.Fragment>
     <div className="banner" id="banner">

<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
    <div className="carousel-inner banner-slider-inner text-center">

        <div className="carousel-item banner-max-height active " >
            <img className="d-block w-100" src={  'images/banner/banner-0.jpg'} id="banner1" alt="banner"/>
            <div className="carousel-content banner-info-2 bi-2 text-center">
            <h2>MacBook Pro</h2>
                <h4>Get more</h4>
            
                    <Link to={`/products-ctgry/Mac`} >Shop Now </Link>
            </div>
        </div>
     
        <div className="carousel-item banner-max-height banner-dark ">
            <img className="d-block w-100" src="images/banner/banner-2.jpg" id="banner3" alt="banner"/>
            <div className="carousel-content  banner-info-2 bi-2 text-center">
            <h2>iPad</h2>
                <h4>Get more out of it</h4>
                    <Link to={`/products-ctgry/iPad`}  >Shop Now 3</Link>

            </div>
        </div>
        <div className="carousel-item banner-max-height ">
            <img className="d-block w-100" src='images/banner/banner-1.jpg' id="banner2" alt="banner"/>
            <div className="carousel-content  banner-info-2 bi-2 text-center">
            <h2>iPhone 14</h2>
                <h4>Bigger and Better</h4>
             
                    <Link to={`/products-ctgry/iPhone`} >Shop Now </Link>

            </div>
        </div>
        <div className="carousel-item banner-max-height banner-dark">
            <img className="d-block w-100" src="images/banner/banner-3.jpg" id="banner4" alt="banner"/>
            <div className="carousel-content  banner-info-2 bi-2 text-center">
            
            <h2>iWatch</h2>
                <h4>The now tech</h4>
          
                <Link to={`/products-ctgry/Earphones`}  >Shop Now 1</Link>

            </div>
        </div>
    </div>
    
    <a className="carousel-control-prev none-580" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="slider-mover-left" aria-hidden="true">
            <i className="fa fa-angle-left"></i>
        </span>
    </a>
    <a className="carousel-control-next none-580" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="slider-mover-right" aria-hidden="true">
            <i className="fa fa-angle-right"></i>
        </span>
    </a>
</div>

</div>
</React.Fragment>
    )
}