import React, {useState} from "react";
import {Link } from 'react-router-dom'
import {useCookies } from 'react-cookie'

export function ImageCarouselSlider(props){

    
function DisplayImage(image){
    if (image){
      const imgurl = image
      let imgstr, imgpref, imgsuf, per
      if (imgurl) {
      const strpos = imgurl.indexOf("images/")+7
       imgstr = imgurl.substring(strpos, imgurl.length)
      }
      if (imgstr.indexOf('_') > 0) {
        let und = imgstr.indexOf('_')
  
        imgpref = (imgstr.substring(0,und))
        per = imgstr.indexOf('.')
        imgsuf = (imgstr.substring(per, imgstr.length))
        imgstr = imgpref + imgsuf
      }
      imgstr = `/images/products/${imgstr}`
      //imgstr = '/images/cars/car-1.jpg'
      return imgstr
    }
    else {
      return 'images/noimg.jpg'
    }
  }
  const {name,    discountpct, image, image1, image2, image3, image4, image5 } = props.item
return (
<div id="carDetailsSlider" className="carousel car-details-sliders slide mb-40">
{ discountpct > 0 ? <span className="sale-detail">SALE</span> : null}
                        {/* main slider carousel items */}
                        <div className="carousel-inner">
                            <div className="active item carousel-item" data-slide-number="0">
                                <img src={DisplayImage( image)} className="img-fluid" alt="" />
                            </div>
                            <div className="item carousel-item" data-slide-number="1">
                                <img src={DisplayImage( image2)} className="img-fluid" alt="" />
                            </div>
                            <div className="item carousel-item" data-slide-number="2">
                                <img src={DisplayImage( image3)} className="img-fluid" alt="" />
                            </div>
                            <div className="item carousel-item" data-slide-number="4">
                                <img src={DisplayImage( image4)} className="img-fluid" alt="" />
                            </div>
                            <div className="item carousel-item" data-slide-number="5">
                                <img src={DisplayImage( image5)} className="img-fluid" alt="" />
                            </div>
                        </div>
                        {/* main slider carousel nav controls */}
                        <div className="carousel-indicators-section clearfix" >
                            <ul className="carousel-indicators car-properties list-inline nav nav-justified">
                                <li className="list-inline-item active">
                                    <a id="carousel-selector-0" className="selected" data-slide-to="0" data-target="#carDetailsSlider">
                                        <img src={DisplayImage( image)} className="img-fluid" alt="" />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a id="carousel-selector-1" data-slide-to="1" data-target="#carDetailsSlider">
                                        <img src={DisplayImage( image2)} className="img-fluid" alt="" />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a id="carousel-selector-2" data-slide-to="2" data-target="#carDetailsSlider">
                                        <img src={DisplayImage( image3)} className="img-fluid" alt="" />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a id="carousel-selector-3" data-slide-to="3" data-target="#carDetailsSlider">
                                        <img src={DisplayImage( image4)} className="img-fluid" alt="" />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a id="carousel-selector-4" data-slide-to="4" data-target="#carDetailsSlider">
                                        <img src={DisplayImage( image5)} className="img-fluid" alt="" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

)

}