import React, {useState} from "react";
import {Link } from 'react-router-dom'
import {useCookies } from 'react-cookie'
import Slider from "react-slick";

export function ImageCarousel(props){

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1
      };
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
  const {name, image, image1, image2, image3, image4, image5 } = props.item
return (
 <div>
     <Slider {...carouselSettings}>
     <div className="slick-slide-item">
        <div className="car-box-3">
        <div className="car-img">
          <div className="car-thumbnail">
              <img className="d-block w-100"   src={DisplayImage(image)} alt=""/>
          </div>
          </div>
        </div>
    </div>
    <div className="slick-slide-item">
        <div className="car-box-3">
        <div className="car-img">
          <div className="car-thumbnail">
              <img className="d-block w-100"   src={DisplayImage(image1)} alt=""/>
          </div>
          </div>
        </div>
    </div>
    <div className="slick-slide-item">
        <div className="car-box-3">
        <div className="car-img">
          <div className="car-thumbnail">
              <img className="d-block w-100"   src={DisplayImage(image2)} alt=""/>
          </div>
          </div>
        </div>
    </div>
    <div className="slick-slide-item">
        <div className="car-box-3">
        <div className="car-img">
          <div className="car-thumbnail">
              <img className="d-block w-100"   src={DisplayImage(image3)} alt=""/>
          </div>
          </div>
        </div>
    </div>
    <div className="slick-slide-item">
        <div className="car-box-3">
        <div className="car-img">
          <div className="car-thumbnail">
              <img className="d-block w-100"   src={DisplayImage(image4)} alt=""/>
          </div>
          </div>
        </div>
    </div>
    <div className="slick-slide-item">
        <div className="car-box-3">
        <div className="car-img">
          <div className="car-thumbnail">
              <img className="d-block w-100"   src={DisplayImage(image5)} alt=""/>
          </div>
          </div>
        </div>
    </div>
    </Slider>
 </div>
)

}