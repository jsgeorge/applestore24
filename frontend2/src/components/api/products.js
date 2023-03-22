import React, {useState, useEffect} from "react";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APIlookup, APIAuthlookup, APIpost,APIpostUnauth } from "./api-lookup";
import { useCookies } from 'react-cookie';
import Slider from "react-slick";
import {  ImageCarouselSlider } from "../layout/imgslider";
import { ImageCarousel } from "../layout/imgcarousel";
import { rateProduct, reviewProduct, getProductReviews } from "../../actions/productActions";
import dateFormat from "dateformat";

export  function ProductsComponent(props){
    const {srchTerm} = props
    
    const [Products, setProducts] = useState([])
    //const [token, setToken] = useCookies(['auth-token']);
    let header = "All Products"
    let [table] = APIlookup("GET", "/api/store/products/");
    
    if (srchTerm) {
      [table] = APIlookup("GET", `/api/store/products?search=${srchTerm}`)
      header = "Search: " + srchTerm

    }
    
    useEffect(()=>{
      setProducts(table)
  
    },[table, Products])


   if (!Products || Products.length === 0)
     return (
      <div className="featured-car content-area">
        <h3>{header}</h3>
        <p style={{color:'#111'}}>No Products found for the search</p>
      </div>
     )
    return ( 
        <div className="featured-car content-area">
           
          <h3>{header}</h3>
        <div className="row">
            {Products && Products.map( auto => (
                <ProductItem key={auto.id} item={auto} />
              ))}
        </div>
        </div>
    )
}

export  function ProductsComponentByMake(props){
  const [Products, setProducts] = useState([])
  const {make, id } = props
 
  const [table] = APIlookup("GET", `/api/filterbymake/?make=${id}`)
  useEffect(()=>{
 
      setProducts(table)
  },[table])


  return ( 
      <div className="featured-car content-area">
        <h3>{make}  ({Products.length})</h3>
        
      <div className="row">
          {Products && Products.map( auto => (
              <ProductItem key={auto.id} item={auto} />
            ))}
      </div>
      </div>
  )
          }
        


export  function ProductsComponentByCtgry(props){
  
            const [Products, setProducts] = useState([])
            const {ctgry } = props
            //const [token, setToken] = useCookies(['auth-token']);
            //const [table] = APIlookup("GET", `/${props.ctgry}`);
            // let [table] = APIlookup("GET", `api/${ctgry}`);
            // if (id>0)
            let [table] = APIlookup("GET", `/api/store/products/categoryproducts/${ctgry}`)

            useEffect(()=>{
              //console.log(ctgry)
              //let url
              // if (ctgry === 'onsale')
              // url = `${SERV}/api/onsale`
              // else
              // url = `${SERV}/api/filter/?category=${id}`
              // if (id>0){
              //   url = `${SERV}/api/filter/?category=${id}`

              //             }
              // else {
              //   url = `${SERV}/api/${ctgry}`
              // }              
            //   fetch(url, {
            //     method: 'GET',
            //     headers:{
            //         'Content-Type': 'application/json'
            //     }
            // })
            // .then(resp => resp.json())
            // .then(resp => setProducts(resp))
            // .catch(error=>console.log(error))
             setProducts(table)
            },[table])
          
          //   useEffect(()=>{
          //     console.log(token);
          //     if(token['auth-token']) window.location.href = "/login";
          // }, [token])
           
            return ( 
                <div className="featured-car content-area">
                     <h4>Products by category</h4>
                  <h3> Shop {props.ctgry} </h3>
                {Products && Products.length > 0 ?
                <div className="row" >
                    { Products.map( product=> (
                        <ProductItem key={product.id} item={product} />
                      ))}  
                </div> : <h6>No Current products for selected category</h6>}
                </div>
            )
                    }
             
                    
export function ProductsFeaturedComponent(props){
        const [Products, setProducts] = useState([])
        const [table] = APIlookup("GET", `/api/store/products/${props.category}/list/`);
        
    useEffect(()=>{
      setProducts(table)
      console.log(table)
    },[table, Products])


   if (!Products || Products.length === 0)
     return (
      <div className="featured-car content-area" style={{clear:"left"}}>
        
        <p style={{color:'#111'}}>No Products found for the search</p>
      </div>
     )
    return ( 
        <div className="featured-car content-area">
       
        <div className="row">
            {Products && Products.map( auto => (
                <FeaturedItem key={auto.id} item={auto} />
              ))}
        </div>
        </div>
    )
}
export function ProductsBannerComponent(props){
  const [Products, setProducts] = useState([])
  const [table] = APIlookup("GET", `/api/store/products/${props.category}/list/`);
  
useEffect(()=>{
setProducts(table)
console.log(table)
},[table, Products])


if (!Products || Products.length === 0)
return (
<div > </div>
)
return ( 
  <div className="featured-car content-area">
      
      {Products && Products.map( auto => (
          <Featured1Item key={auto.id} item={auto} />
        ))}
  </div>
  
)
}
export function ProductsFeatured2Component(props){
  const [Products, setProducts] = useState([])
  const [table] = APIlookup("GET", `/api/store/products/${props.category}/list/`);
  
useEffect(()=>{
setProducts(table)
console.log(table)
},[table, Products])


if (!Products || Products.length === 0)
return (
<div className="featured-car content-areac" style={{clear:"left",width:"100%"}}>
  
  <p style={{color:'#111'}}>No Products found for the search</p>
</div>
)
return ( 
  <div className="featured-car content-area" style={{clear:"left",width:"100%"}}>
  
  <div className="row">
      {Products && Products.map( auto => (
          <Featured2Item key={auto.id} item={auto} />
        ))}
  </div>
  </div>
)
}

                    
export function ProductsCarouselComponent(props){
  const [Products, setProducts] = useState([])
  const [table] = APIlookup("GET", `/api/store/products/${props.category}/list/`);
  let slidesShowCnt = 3
  if (Products.length < 3 ) slidesShowCnt = Products.length
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesShowCnt,
    slidesToScroll: 1
  };
  // let slidesShowCntT = 4
  // if (Products.length < 4 ) slidesShowCntT = Products.length
  
  useEffect(()=>{
    setProducts(table)
  
},[props.category, table, Products])

  return (
    <div className="container-fluid">
     <div className="featured-car content-area-4">
        
        <div className="main-title">
           <h1> {props.category} Products</h1>
        </div>
        <span className="desktop-slider">
       <Slider {...carouselSettings}>
          { Products.map( auto => (
               <CarouselItem key={auto.id} item={auto} /> 
            ))}
        </Slider>
        
       </span>
       <span className="mobile">
       <div className="row" >
                    {Products && Products.map( product=> (
                        <ProductItem key={product.id} item={product} />
                      ))}  
                </div>
        </span>
        <div style={{clear:"left"}}>
        <div style={{textAlign:"center"}}>
        <Link to={`/products/shop`} className="btn btn-theme btn-wide">View All</Link>
      </div>
      </div>
      </div>
    </div>
  )
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

function CarouselItem (props){
  const {id, name, slug, color, category, regular_price, discountpct, discount_price,  product_image, product_spec, inv_qty, rating_cnt, ave_rating, review_cnt} = props.item

  const [token, setToken] = useCookies(['auth-token']);
  
    return (
      <div className="slick-slide-item">
       
        <div className="car-box-3">
        { product_image[3].image && 
        <Link to={`/products/${category.name}/${slug}`} className="car-img">
          <div className="car-thumbnail">
              <img className="d-block w-100" src={product_image[3].image} alt=""/>
              
          </div>
          </Link>}

          <p style={{textAlign:"center"}}><i className={ ave_rating > 0 ? "fa fa-star fa-lg" : "fa fa-star-o"}></i><i className={ ave_rating > 1 ? "fa fa-star fa-lg" : "fa fa-star-o"}></i><i className={ ave_rating > 2 ? "fa fa-star fa-lg" : "fa fa-star-o"}></i><i className={ ave_rating > 3 ? "fa fa-star fa-lg" : "fa fa-star-o"}></i><i className={ ave_rating > 4? "fa fa-star fa-lg" : "fa fa-star-o"}></i> </p>
          <div className="detail">
          
              <span className="title"><Link to={`/products/${category.name}/${slug}`}> {name}</Link></span><br/>
             
              <div className="location">{inv_qty > 0 ? <span>
            { ShowPrice(regular_price, discountpct, discount_price)}</span> : <span>Out Of Stock</span>}
        </div>
            
           
            {/* <div className="location"> */}
               {/* <span><i className="flaticon-pin"></i> {location} </span><br/> */}
               
    {/* <button className="btn btn-danger item-cmd"><i className="fa fa-heart"></i></button> */}
   
    {/************************************************************************************** */}
     {/* Add to store site */}
     {/* <Link to={`/products/${category.name}/${category.id}/${name}/${id}`} className="btn btn-danger item-cmd"><i className="fa fa-eye  "></i></Link> */}
     {/* <button className="btn btn-danger item-cmd"><i className="fa fa-signal"></i></button> */}
       {/* <button className="btn btn-danger item-cmd"><i className="fa fa-shopping-cart"></i></button>
       </React.Fragment> : null}  */}
      {/************************************************************************************** */}
      {/* <button className="btn btn-dark item-cmd"><i className="fa fa-envelope"></i></button> */}
       
    {/* </div> */}
          </div>
        </div>
      </div>
      )
}
function FeaturedItem (props){
  const {id, name, slug, color, category, regular_price, img_bkd, discountpct, discount_price, headline,  product_image, product_spec, inv_qty, rating_cnt, ave_rating, review_cnt} = props.item


  
    return (
        <div className="col-md-3 col-sm-3">
         
        { product_image[2].image && 
        <Link to={`/products/${category.name}/${slug}`} className="car-img">
          <div className="car-thumbnail">
          <img className="d-block w-100" src={product_image[2].image} alt=""/>
           
             <div className='featured-text' > 
               <h5><Link to={`/products/${category.name}/${slug}`}> {name}</Link></h5>
              <h6>{headline}</h6>
            
                <Link to={`/products/${category.name}/${slug}`}>Buy</Link>
          </div>
         </div>
          </Link>}
            
           

          </div>
      
    
      )
  }
function Featured1Item (props){
  const {id, name, slug, color, category, regular_price, img_bkd, discountpct, discount_price, headline,  product_image, product_spec, inv_qty, rating_cnt, ave_rating, review_cnt} = props.item

    return (
        <div>
           
        { product_image[0].image && 
        <Link to={`/products/${category.name}/${slug}`} className="car-img" >
          <div className="car-thumbnail">
          <img  src={product_image[0].image}  alt=""/>
           
             <div className={ img_bkd && img_bkd === 'white' ? 'featured-text' : 'featured-text-w'} > 
               <h1> {name}</h1>
              <h3>{headline}</h3>
            
                <Link to={`/products/${category.name}/${slug}`}>Buy</Link>
          </div>
         </div>
          </Link>}
          
          </div>
      
    
      )
  }
function Featured2Item (props){
  const {id, name, slug, color, category, regular_price, img_bkd, discountpct, discount_price, headline,  product_image, product_spec, inv_qty, rating_cnt, ave_rating, review_cnt} = props.item


  
    return (
        <div className="col-lg-6 col-md-6 col-sm-6">
        
        { product_image[1].image && 
        <Link to={`/products/${category.name}/${slug}`} className="car-img">
          <div className="car-thumbnail">
          <img className="d-block w-100" src={product_image[1].image} alt=""/>
           
             <div className={ img_bkd && img_bkd === 'white' ? 'featured-text' : 'featured-text-w'}> 
               <h5><Link to={`/products/${category.name}/${slug}`}> {name}</Link></h5>
              <h6>{headline}</h6>
            
                <Link to={`/products/${category.name}/${slug}`}>Buy</Link>
          </div>
         </div>
          </Link>}
            
           

          </div>
      
    
      )
  }
function ProductItem(props){
  const {id, name, slug, color, category, regular_price, discountpct, discount_price, inv_qty, product_image, product_spec, rating_cnt, ave_rating, review_cnt} = props.item
    const [token, setToken] = useCookies(['auth-token']);
    return(
      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" >
         
 <div className="car-box">
 
 <Link to={`/products/${category.slug}/${slug}`} className="car-img">
 { discountpct > 0 ? <span className="BestPrices">SALE</span> : <span className="filler"></span>}
    <div className="car-thumbnail">
     
            <img src={ product_image[2].image} alt={"No Img"}/> 
      
    </div>
    </Link>
    <div className="detail">
  <i className={ ave_rating > 0 ? "fa fa-star " : "fa fa-star-o"}></i><i className={ ave_rating > 1 ? "fa fa-star" : "fa fa-star-o"}></i><i className={ ave_rating > 2 ? "fa fa-star " : "fa fa-star-o"}></i><i className={ ave_rating > 3 ? "fa fa-star " : "fa fa-star-o"}></i><i className={ ave_rating > 4? "fa fa-star" : "fa fa-star-o"}></i><br/>
        <span className="title"><Link to={`/products/${category.slug}/${slug}`}> {name}</Link></span>
        <div className="item-specs">
                 {product_spec.length > 0 ? <span>
                     {product_spec.map( s=>(
                         <span key={s.id}> {s.specification.name} {s.value} <br/> </span>
                     ))}
                 </span> : null}
              </div>
        <div className="location">
           {inv_qty > 0 ? <span>{ ShowPrice(regular_price, discountpct, discount_price)}</span> : <span>Out of Stock</span>}
        </div>
        <div className="cmds">
        {inv_qty > 0 && <Link to={`/products/${category.slug}/${slug}`} className="btn btn-primary btn-sm"> Buy</Link>}
       </div>
    </div>
       {/************************************************************************************** */}
     {/* Add to store site */}
    
    {/* <div className="car-footer">
    { token['auth-token'] ? <React.Fragment>
    <Link to={`/products/${category.name}/${category.id}/${name}/${id}`} className="btn btn-danger item-cmd"><i className="fa fa-eye"></i></Link>
     <button className="btn btn-danger item-cmd"><i className="fa fa-heart"></i></button> 
     <button className="btn btn-danger item-cmd"><i className="fa fa-signal"></i></button> 
       <button className="btn btn-danger item-cmd"><i className="fa fa-shopping-cart"></i></button>
    
     
      <button className="btn btn-danger item-cmd"><i className="fa fa-envelope"></i></button>
      
       </React.Fragment> : null}
    </div> */}
     {/************************************************************************************** */}
    </div>
</div>
    )
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

export function ProductDetailComponent(props){
    const {slug} = props
    const [product, setProduct ] = useState([])
    const [token] = useCookies(['auth-token']);
    const [highlighted, setHighlighted] = useState(-1)
    const [like, setLike] = useState(false)
    const [rating, setRating] = useState(-1)
    const [reviewContent, setReviewContent] = useState("")
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} =  userLogin
    const [ cartitems, setcartitems] = useState([])
    const record = APIlookup("GET", `/api/store/products/${slug}/`)
    const rateProd = useSelector((state) => state.prodRating)
    const {error, success} = rateProd
    const reviewProd = useSelector((state) => state.reviewProduct)
    const [message,setMessage] = useState("")
    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] = useState("")
    const [subject,setSubject] = useState("")
    const [email,setEmail] = useState("")
    const [qty, setQty] = useState(1)
    const [errMsg, setErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    let navigate = useNavigate()
    
    useEffect(()=>{
        setProduct(record[0])
    },[ dispatch, product, record])
    
    const rateClicked = e => {
      setRating(highlighted)
      console.log(highlighted)
      console.log(rating)
    }
    const onSubmitRateProduct = (e) =>{
      if (rating < 1)
         setErrMsg('Invalid rating response')
      else
        // APIpost("POST", `/api/store/products/${product.id}/rate/`, {stars: rating})
        dispatch(rateProduct(product.id,  {stars: rating}))

      if (error){
        setErrMsg("You have already submittd a rating for thi proudct")
      }
      else if (success) {
        setSuccessMsg('You have submitted a rating successfully')
      }
      setRating(-1)
    }

    const onClickAddToCart=()=>{
       navigate(`/checkout/cart/${slug}?qty=${qty}`)
    }
    
    const onClickAddToFavorites=()=>{
      console.log("favorite clicked")
      setLike(!like)
      console.log("like", like)
     
      let data = {
        like:true
      }
      APIpost("POST", `/api/store/products/${slug}/like/`, data, token['auth-token'])
    }
    
    const onSubmitReview = (e) =>{
      if (!reviewContent)
        setErrMsg('Invalid review content')
     else
      // APIpost("POST", `api/products/${slug}/review/`,{ content: review}, token['auth-token'])
      dispatch(reviewProduct(product.id,  { content: reviewContent}))

    // if (error){
    //     console.log('You already submitted a review')
    //     setErrMsg("You have already submittd a review for thi proudct")
    //   }
    //   else if (success) {
    //     setSuccessMsg('You have submitted a rating successfully')
    //   }
      setReviewContent("")
    }
  
    const star = (ave_rating, no) => {
      
      return (
        <i className={ ave_rating >  no? "star fa fa-star fa-lg" : "star fa fa-star-o fa-lg"}></i>
      )
    }

    const starRating = (ave_ratin, rating_cnt) => {
      return (
        <React.Fragment>
          
        {star(ave_rating,0)} {star(ave_rating,1)} {star(ave_rating,2)} {star(ave_rating,3)} {star(ave_rating,4)}   {rating_cnt>0 && <span>{rating_cnt} votes </span>}
        
     
        </React.Fragment>
      )
    }

    const rateBtn = () =>{
      return (
        <React.Fragment>
          { userInfo ?
           <button className="btn btn-danger btn-share" data-toggle="modal" data-target="#ProductRaterModal"><i className="fa fa-star"></i>Rate</button> :
                      <Link to={'/logn'} className="btn btn-danger btn-share">Rate it</Link>
          }
        </React.Fragment>
      )
    }

    const likeBtn = () =>{
      return (
        <button className="btn btn-primary btn-share"><i className="fa fa-thumbs-up"></i> Like</button> 
      )
    }
    const reviewBox = (review_cnt)=>{
      return (
        <React.Fragment>
        <span> <br/> <a href="#reviews"> {review_cnt} Reviews</a></span> <br/> 
        { userInfo ? 
              <span> <button className="btn btn-light" data-toggle="modal" data-target="#ProductReviewModal">Write a review</button>    <button  className="btn btn-default btn-transp" data-toggle="modal" data-target="#ProductRaterModal" style={{marginLeft:'5px',border:'none'}}>Rate it</button></span> : 
        <span><Link to={'/login'} className="btn btn-light">Write a review</Link> <Link to={'/login'} className="btn btn-light">Rate It</Link></span>}
        </React.Fragment>
      )
    }

    const ReviewItem = (props) => {
      const {id, item} = props;
      const user = GetUser(item.user)
    
      return (
        <p style={{color:"#111"}} > <strong>@{item.name}</strong>  {DisplayDate(item.timestamp)} <br/>
        {item.content}</p>
      )
    }
     
    const GetUser = (id) => {
     const user = APIlookup('GET',`api/users/${id}/`)
  return user
}


    const AddToCartBtn=()=>{
      return (
        <React.Fragment>
           {/* { token['auth-token'] ? */}
             <div className="detail-section">
                       {/************************************************************************************** */}
                       {/* Add to store site */}
                     
                       {/* <button className="btn btn-light "><i className="fa fa-signal"></i></button><br/> */}
                       Quantity <select  onChange={(e)=>setQty(e.target.value)} value={qty} style={{width:"70px",bordpadding:"12px"}}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        </select><br/><br/><br/>
                        {/* { token['auth-token'] ? 
                        <React.Fragment> */}
                        {/* <button className="btn btn-theme w-100" onClick={(e)=>onClickAddToCart(e)}><i className="fa fa-shopping-cart"></i> Add to Cart</button>   */}
                       <Link to={`/checkout/cart/${slug}?qty=${qty}`} className="btn btn-theme w-100">Add To Cart</Link>
                       <button className="btn btn-light"  onClick={(e)=>onClickAddToFavorites(e)}>{like ? <i className="fa fa-heart" style={{color:"red"}}> </i> : <i className="fa fa-heart-o"></i>}</button> 
                       {/* </React.Fragment> :
                       <Link className="btn btn-theme w-100" to={'/login'}><i className="fa fa-shopping-cart"></i> </Link>
                       } */}
              </div>
        </React.Fragment>
      )
    }

    const ShowPrice = ( price, discountpct, discount_price)=>{
      return (
        <div className="prod-price">
           { discountpct > 0 ? 
              <h5> <span style={{textDecoration:"line-through"}}>${price}</span> <span>${discount_price}</span> </h5> : 
              <span><h5>${price}</h5> </span>
            }
       </div> 
      )
    }
    

    const {id, vin, name, product_image, product_spec,  description, inv_qty, regular_price, discountpct, 
      discount_price,  category, location, fueltype, transmission, engine, milage, stock, owners,
       color, condition,  rating_cnt, ave_rating, review_cnt, reviews } = product;
    
       console.log(reviews)
    return (
      <div className="featured-car content-area" >
        
        { errMsg && <div className="alert alert-danger" role="alert">{errMsg}</div>}
        { successMsg && <div className="alert alert-success" role="alert">{successMsg}</div>}
        { product ? 
         <div>
         
           <div className="detail-header">
           <div className="breadcrumbs">
                <Link to={'/'}>Products</Link>  {'>'} { category && category.name && <Link to={`/products-ctgry/${category.name}`}>{category.name}</Link>} {'>'} <span>{name}</span>
                </div>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                
                  
                
                   { product_image && product_image[0].image && 
        <div className="car-img">
          <div className="car-thumbnail">
              <img className="d-block w-100"   src={product_image[2].image} alt=""/>
              
          </div>
          </div>} 
               </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 Product-details">
              
                <div className="detail-title">
                <h3>{name}</h3>
                 <p>SKU {id}</p>
               
                 </div>
            
                <div className="detail-section">
                  {starRating(ave_rating, rating_cnt)} <br/>
                  {reviewBox(review_cnt)}
                  </div>
                <div className="modal fade" id="ProductRaterModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content" id="ProductRaterForm" style={{background:'#eee',color:'#111'}}>
                      <div className="modal-header" style={{border:'none'}}>
                        <h5 className="modal-title" id="exampleModalLongTitle">Rate Product {name}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body" style={{textAlign:'center'}}>
                      { errMsg && <div className="alert alert-danger" role="alert">{errMsg}</div>}
       
                        
                        {[...Array(5)].map((e, i)=>{
                              return <i key={i} className={highlighted > i? 'fa fa-star fa-2x' : 'fa fa-star-o fa-2x'}
                                onMouseEnter={e=>setHighlighted(i+1)}
                                //onMouseLeave={e=>setHighlighted(-1)}
                                onClick={e=>rateClicked(i)}
                                ></i>
                        })}<br/>
                        <button type="submit" className="btn btn-dark" onClick={e=>onSubmitRateProduct(e)}>Rate</button>  
                      {/* </form> */}
                      </div>
                      <div className="modal-footer" style={{border:"none"}}>
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal fade" id="ProductReviewModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content" id="ProductReviewForm">
                      <div className="modal-header" style={{border:'none'}}>
                        <h3 className="modal-title" id="ModalLongTitle">Write a Review for {name}</h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body" style={{textAlign:'center'}}>
                        <textarea rows="8" className="form-control" placeholder="Your thoughts" onChange={(e)=>setReviewContent(e.target.value)}></textarea>
                        
                        <br/>
                        <button type="submit" className="btn btn-dark" onClick={e=>onSubmitReview(e)}>Submit Review</button>  
                      {/* </form> */}
                      </div>
                      <div className="modal-footer" style={{border:"none"}}>
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div className="detail-section">Share {likeBtn()} {rateBtn()}</div>
                 <br/>
             { inv_qty > 0 ? <span>
               {ShowPrice(regular_price, discountpct, discount_price)}
                <div className="car-footer">{AddToCartBtn()}  </div></span>
                 : <span>Item Out Of Stock</span>}
                </div>
            </div>
            </div>
            <div className="detail-specs">
              <div className="row">
              <div className="col-md-6">
            <h6>DESCRIPTION</h6>
            <p>{description}</p>
            </div>
                <div className="col-md-6 shaded">
                  
                  <div className="specs">
                    <h6>SPECS</h6>
                 {product_spec && product_spec.length > 0 ? <span>
                     {product_spec.map( s=>(
                        <p  key={s.id}><strong>{s.specification.name}</strong><span className="pull-right">{s.value}</span></p>
                      
                     ))}
                 </span> : <span> No current specs</span>}
              </div>
            </div>
          
            </div>
            
                </div> {/*end Product-details */}
            <div className="reviews" id="reviews">
              
               { review_cnt>0 ?
              <span>
                <h3>Reviews</h3>
                   { reviews.map( r => (
                    //  <p key={r.id}>  {r.content}</p>
                     <ReviewItem key={r.id} id={r.id} item={r} />
                  ) )}

                  
              </span> :
              <span>
                <p style={{color:"#111"}}>No reviews yet</p>
                </span>} 
              </div>
            
            
         </div> : <div className="container">
          <p>Product not found in our database</p>
        </div>
    }     
    </div>
    )
}

function DisplayCtgryImage(image){
  const imgurl = image
  let imgstr, imgpref, imgsuf, per
  if (imgurl) {
  const strpos = imgurl.indexOf("images/")+7
   imgstr = imgurl.substring(strpos-1, imgurl.length)
  }
  if (imgstr.indexOf('_') > 0) {
    let und = imgstr.indexOf('_')

    imgpref = (imgstr.substring(0,und))
    per = imgstr.indexOf('.')
    imgsuf = (imgstr.substring(per, imgstr.length))
    imgstr = imgpref + imgsuf
  }
  imgstr = `/images/categories/${imgstr}`

  return imgstr
}

export  function CategoriesComponent(props){
  const {srchTerm} = props
  const [categories, setCategories] = useState([])
  //const [token, setToken] = useCookies(['auth-token']);

  const [table] = APIlookup("GET", "api/store/categories/list/");

  useEffect(()=>{
      setCategories(table)
      
  },[srchTerm, table, categories])

//   useEffect(()=>{
//     console.log(token);
//     if(token['auth-token']) window.location.href = "/login";
// }, [token])

  return ( 
      <div className="featured-car content-area" style={{marginLeft:"15px"}}>
        <h5>Categories</h5>
      <ul style={{listStyle:"none", border:"1px solid #eee"}}>
          {categories && categories.map( c => (
             <li key={c.id} style={{marginBottom:"10px"}}>
              <Link  to={`/category/${c.name}/${c.id}`} style={{padding:"20px",fontSize:"16px"}}> {c.name}</Link>
              </li>
            ))}
      </ul>
      </div>
  )
}

export  function CategoryCarouselComponent(props){
  const [categories, setCategories] = useState([])
  // const [table] = APIlookup("GET", `/${props.category}`);
  const [table] = APIlookup("GET", `/api/store/products/categories/list/`);
  let visSlidesCnt = 6;
  if (categories.length < 6){
    visSlidesCnt = categories.length
  }
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: visSlidesCnt,
    slidesToScroll: 1
  };
  const carouselSettingsM = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2
  };
  useEffect(()=>{
    setCategories(table)
},[ table, categories])

 
  return (
    <div className="container-fluid">
     <div className="featured-car content-area-5">
        
          
        <div className="main-title">
            <h1>Shop by Category </h1>
        </div>
        <div className="desktop-slider">
        <Slider {...carouselSettings}>
        { categories.map( c => (
             <div key={c.menu_order} className="slick-slide-item" >
             <div className="car-box-3 ctgry-box">
             {/* <Link to={`/category/${c.name}/${c.menu_order}`} className="ctgry-img">
               <div className="ctgry-thumbnail">
                   <img className="d-block w-100"   src={DisplayCtgryImage(c.image)} alt="img"/>
               </div>
               </Link> */}
               <div className="detail">
                   <h1 className="title">
                      <Link to={`/products-ctgry/${c.slug}`}> {c.name}</Link><br/>
                      

                 </h1>
                
               </div>
             </div>
           </div>
          
          ))}
         
        </Slider>
        </div>
        <div className="mobile-slider">
        <Slider {...carouselSettingsM}>
        { categories.map( c => (
             <div key={c.menu_order} className="slick-slide-item" style={{height:"120px"}}>
             <div className="car-box-3">
             {/* <Link to={`/category/${c.name}/${c.id}`} className="car-img">
               <div className="ctgry-thumbnail" style={{height:"80px"}}>
                   <img className="d-block w-100"   src={DisplayCtgryImage(c.image)} alt="img"/>
               </div>
               </Link> */}
               <div className="detail">
                   <h1 className="title">
                      <Link to={`/products-ctgry/${c.slug}`}> {c.name}</Link><br/>
                      

                 </h1>
                
               </div>
             </div>
           </div>
          
          ))}
         
        </Slider>
        </div>
       
      </div>
      </div>
  )
}

export function CategoryNavComponent(props){
  const [categories, setCategories] = useState([])
  const [table] = APIlookup("GET", `/api/store/categories/list/`);
  useEffect(()=>{
    setCategories(table)
    
},[ table, categories])
  return (
    <React.Fragment>
        <li className="nav-item"><Link to="/products/shop" className="nav-link">Shop</Link></li>
       { categories.map( c => (
        <li key={c.menu_order} className="nav-item">
              <Link  to={`/products-ctgry/${c.slug}`} className="nav-link"> {c.name}</Link>
              </li>
          ))}
         
      
    </React.Fragment>
  )
}
export function CategoryNavMobileComponent(props){
  const [categories, setCategories] = useState([])
  const [table] = APIlookup("GET", `/api/store/categories/list/`);
  useEffect(()=>{
    setCategories(table)
    
},[ table, categories])
  return (
    <React.Fragment>
    
        <li className="nav-item-mobile"><Link to="/products/shop" className="nav-link">Shop All</Link></li>
       { categories.map( c => (
              <li className="nav-item-mobile" key={c.menu_order}><Link to={`/category/${c.name}/${c.id}`} className="nav-link">{c.name}</Link></li>
          ))}
        <li className="nav-item-mobile"><Link to="/products" className="nav-link">Sale</Link></li>
      
    </React.Fragment>
  )
}

function CategoryItem(props){
  const {id, name, slug, image} = props.item
 
  return(
    <div className="col-lg-2 col-md-4 col-sm-3 col-xs-3 category-item">
<div className="car-box">
  {/* <div className="car-thumbnail2">
      <Link to={`/category/${name}/${id}`} className="car-img">
          <img className="d-block w-100"  src={DisplayCtgryImage( image)} alt="img"/>
      </Link>
  </div> */}
  <div className="detail">
      <p className="title">
          <Link  to={`/products-ctgry/${slug}`}> {name}</Link></p>
         
      
  </div>
  </div>
</div>
  )
}


export  function CategoryPageComponent(props){
  const [categories, setCategories] = useState([])
  const [makes, setMakes] = useState([])
  // const [table] = APIlookup("GET", `/${props.category}`);
  const [table] = APIlookup("GET", `/api/store/categories/list/`);
  // const [tableMakes] = APIlookup("GET", `api/makes`);
  useEffect(()=>{
    setCategories(table)
    // setMakes(tableMakes)
},[ table, categories])

  return (
     <div className="featured-car content-area-">
        <div className="container">
        <div className="main-title">
            <h2> <span>Shop by Category</span> </h2>
        </div>
        <div className="row">
        { categories.map( c => (
              <CategoryItem key={c.id} item={c} />
          ))}
         
      
         </div>
      </div>
      {/* <div className="container">
        <div className="main-title">
            <h1> <span>Shop by Make</span> </h1>
        </div>
        <div className="row">
        { makes.map( c => (
              <MakeItem key={c.id} item={c} />
          ))}
         
      
         </div>
      </div> */}
      </div>
  )
}


function MakeItem(props){
  const {id, name, image} = props.item
 
  return(
    <div className="col-lg-2 col-md-4 col-sm-4 col-xs-4 category-item">
<div className="car-box">
  {/* <div className="car-thumbnail2">
      <Link to={`/category/${name}/${id}`} className="car-img">
          <img className="d-block w-100"  src={DisplayCtgryImage( image)} alt="img"/>
      </Link>
  </div> */}
  <div className="detail">
      <p className="title">
          <Link to={`/make/${name}/${id}`}> {name}</Link></p>
         
      
  </div>
  </div>
</div>
  )
}

export  function MakesComponent(props){
  const {srchTerm} = props
  const [makes, setMakes] = useState([])
  //const [token, setToken] = useCookies(['auth-token']);

  const [table] = APIlookup("GET", "api/makes");

  useEffect(()=>{
      setMakes(table)
      
  },[srchTerm, table, makes])

//   useEffect(()=>{
//     console.log(token);
//     if(token['auth-token']) window.location.href = "/login";
// }, [token])

  return ( 
      <div className="featured-car content-area" style={{marginLeft:"15px"}}>
        <h5>Makes</h5>
      <ul style={{listStyle:"none", border:"1px solid #eee"}}>
          {makes && makes.map( c => (
             <li key={c.id} style={{marginBottom:"10px"}}>
              <Link  to={`/make/${c.name}/${c.id}`} style={{padding:"20px",fontSize:"16px"}}> {c.name}</Link>
              </li>
            ))}
      </ul>
      </div>
  )
}

