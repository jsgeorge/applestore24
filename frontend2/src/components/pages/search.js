import React, {useState, useEffect} from "react";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import { APIlookup, APIAuthlookup, APIpost,APIpostUnauth } from "../api/api-lookup";
import dateFormat from "dateformat";

import {} from "../../components/api/products"

export default function SearchProductsPage(){
    const [srchTerm, setSrchTerm] = useState('')
    const s = window.location.search;
    const p = new URLSearchParams(s);
    let srchterm = p.get('q');
    const [Products, setProducts] = useState([])
    let header 
    let [table] = APIlookup("GET", `/api/products?search=${srchterm}`)
    header = "Search: " + srchterm

      
      useEffect(()=>{
        setProducts(table)
        console.log(table)
      },[table, Products])

    const onSearchSubmit = (e)=> {
        e.preventDefault()
        console.log(srchTerm)
        [table] = APIlookup("GET", `/api/products?search=${srchTerm}`)
        // setProducts(table)
      
    }
      function DisplayDate(dte){
        return dateFormat(dte, " m/dd/yyyy");
      }

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
          return 'noimg.jpg'
        }
      }
      
      const ShowPrice = ( price, discountpct, discount_price)=>{
        return (
          <React.Fragment>
             { discountpct > 0 ? 
                <h5> <span className="font-theme" style={{textDecoration:"line-through"}}>${price}</span> <br/> <span className="font-theme">${discount_price}</span> </h5> : 
                <span className="font-theme"><h5>${price}</h5> </span>
              }
         </React.Fragment> 
        )
      }
      
      function ProductItem(props){
        const {id, name, slug, color, category, regular_price, discountpct, discount_price, inv_qty, product_image, rating_cnt, ave_rating, review_cnt} = props.item
        
          return(
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" >
       <div className="car-box">
       
       <Link to={`/products/${category.slug}/${slug}`} className="car-img">
       { discountpct > 0 ? <span className="BestPrices">SALE</span> : <span className="filler"></span>}
          <div className="car-thumbnail">
           
                  <img src={DisplayImage( product_image[0].image)} alt={"No Img"}/> 
            
          </div>
          </Link>
          <div className="detail">
        <i className={ ave_rating > 0 ? "fa fa-star fa-lg" : "fa fa-star-o"}></i><i className={ ave_rating > 1 ? "fa fa-star fa-lg" : "fa fa-star-o"}></i><i className={ ave_rating > 2 ? "fa fa-star fa-lg" : "fa fa-star-o"}></i><i className={ ave_rating > 3 ? "fa fa-star fa-lg" : "fa fa-star-o"}></i><i className={ ave_rating > 4? "fa fa-star fa-lg" : "fa fa-star-o"}></i><br/>
              <span className="title"><Link to={`/products/${category.name}/${category.id}/${name}/${id}`}> {name}</Link></span>
              <div className="location">
                 {inv_qty > 0 ?
                  <span>{ ShowPrice(regular_price, discountpct, discount_price)}</span> : <span>Out of Stock</span>}
              </div>
          </div>
         
          </div>
      </div>
          )
      }
    if (!Products || Products.length === 0)
      return (
       <div className="featured-car content-area">
         <h3>{header}</h3>
         <p style={{color:'#111'}}>No Products found for the search</p>
       </div>
      )
    return (
        <div>
              
              <div className="page-wrapper"> 
                   <div className="container">
                    <div className="row">
                        <div className="col-md-5 col-sm-5">
                   <input  style={{width:"80%", background:"#eee",border:"none"}} type="text" placeholder="Search" aria-label="Search" onChange={(e=>setSrchTerm(e.target.value))}/>
                     <button type="submit" className="btn btn-default" style={{background:"#eee"}}   onClick={e=>onSearchSubmit(e)}><i className="fa fa-search"></i></button>
                     </div>
                     </div>
                      <h3>Search Products {srchterm}</h3>
                         <div className="row">
            {Products && Products.map( auto => (
                <ProductItem key={auto.id} item={auto} />
              ))}
        </div>
                       </div>
              </div> 
        </div>
    )
}