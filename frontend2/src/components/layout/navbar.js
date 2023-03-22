import React, {useState, useEffect} from "react";
import {Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// import { APIlookup, APIAuthlookup } from "../api-lookup";
import { CategoryNavComponent} from "../api/products";
import {logout} from '../../actions/userActions';

export function HeaderComponent(){
//   const [token, setToken, removeCookie] = useCookies(['auth-token']);
  const [srchTerm, setSrchTerm] = useState('')
  const navigate = useNavigate();
  const dispatch  = useDispatch();
  const [isAuth, setIsAuth] = useState(false)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo} =  userLogin
  //   let [tableCart] = APIAuthlookup("GET", "/orders/view_cart/");
  const [showSrch, setShowSrch] = useState(false)
  const [isAdmin,setIsAdmin] = useState(false)
   useEffect(()=>{
    //     setCartItems(tableCart)
      setIsAdmin(localStorage.getItem('admin'))
      if (userInfo) setIsAuth(true)
       
      },[userInfo, isAuth, isAdmin])

    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart
    
  
  const onClickSignout = (e) => {
    // removeCookie("auth-token")
     dispatch(logout)
     navigate('/login')
  }

  const onSearchSubmit = (e)=> {
      e.preventDefault()
      console.log(srchTerm)
      if (srchTerm && srchTerm.length>0)
         navigate(`/search?q=${srchTerm}`)
         
  }

return  (
<header className="main-header">
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor:'#111'}}>
       <div className="container">
            <Link className="navbar-brand company-logo" to="/"> {/* <img src="/images/logo2.png"  alt="logo"/>  */}AppleStore { isAdmin && <span>ADMIN</span>}</Link>
               <span className="dropdown">
                <a  className="mobile-srch-dropdown dropdown-toggle" data-toggle="dropdown" ><i className="fa fa-search fa-lg" style={{color:"#fff"}}></i></a>

                 <div className="mobile-dropdown dropdown-menu srch-menu" style={{background:"#111"}} >
                        <form  style={{width:"100%"}} id="mobile-search-form" onSubmit={e=>onSearchSubmit(e)}>
        <div className="md-form ml-auto">
            <input  style={{width:"80%",border:"none",background:"#111",color:"#fff"}} id="srch-box" type="text" placeholder="Search" aria-label="Search" onChange={e=>setSrchTerm(e.target.value)}/>
                <button type="submit" className="btn btn-theme" id="srch-btn"><i className="fa fa-search fa-lg" style={{color:"#fff"}}></i></button>
        </div>
                        </form>
                </div>
                </span>
                <span className="dropdown">
             <a  className="mobile-user-dropdown dropdown-toggle" data-toggle="dropdown" ><i className="fa fa-user-circle fa-lg" style={{color:"#fff"}}></i></a>
                <div className="mobile-dropdown dropdown-menu user-menu" style={{position:"abosolute",top:'20',width:"100%", background:"#111"}} >
                { isAuth ?
                        <React.Fragment>
                            <Link to="/user/profile"  className="dropdown-item">My Profile</Link>
                            
                            <Link to="/lists/favorites"  className="dropdown-item">Wish List</Link>
                            <Link to="/user/orders"  className="dropdown-item">My Orders</Link>
                            <Link to="/lists/wallet"  className="dropdown-item">My Wallet</Link>
                            <Link to="/lists/addresses"  className="dropdown-item">My Addresses</Link>
                            <button className="dropdown-item " onClick={()=>onClickSignout()}>Sign out</button>
                        </React.Fragment>
                        : 
                        <React.Fragment>
                            <Link to="/login"  className="dropdown-item">Login</Link>
                            
                            <Link to="/signup"  className="dropdown-item">Register</Link>
                    </React.Fragment>
                    } 
                </div> 
        </span>
                 <Link to="/cart" className="nav-link mobile-cart"><i className="fa fa-shopping-cart fa-lg" style={{color:"#fff"}}></i> <span className="cart-item-cnt">{ cartItems && cartItems.length > 0 ? cartItems.length : 0}</span></Link> 
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation"><span className="fa fa-bars fa-lg" style={{color:"#fff"}}></span> </button>
        { showSrch ? 
         <form className="form-inline search"  style={{width:"60%"}}  onSubmit={e=>onSearchSubmit(e)}>
            <div className="md-form ml-auto">
                <input
                     className="form-control" 
                     id="srch-box" 
                     style={{width:"70%"}} 
                     type="text"
                     placeholder="Search" 
                     aria-label="Search" 
                     onChange={e=>setSrchTerm(e.target.value)}/>
                <button 
                    type="submit" 
                    className="btn btn-theme" 
                    id="srch-btn">
                        <i className="fa fa-search fa-lg"></i>
                </button>
                <button 
                    type="button"
                    className="btn btn-theme"
                    id="srch_close_btn"
                    onClick={(e)=>setShowSrch(false)}>
                        <i className="fa fa-close fa-lg"></i>
                    </button>
            </div>
        </form>
        :
            <React.Fragment>
               
        <div className="modal fade" id="userNavModal1" role="dialog" style={{top:'20px'}}>
            <div className="modal-dialog">
                <div className="modal-content">
                    
                    <ul className="navbar-nav mr-auto">
                    {/* { token['auth-token'] ?  */}
                    { isAuth ?
                    <React.Fragment>
                        <li className="nav-item">
                            <Link to="/user/profile"  className="nav-link " >
                                <i className="fa fa-user fa-2x"></i> Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user/orders"  className="nav-link " >
                                <i className="fa fa-user fa-2x"></i> Past Orders
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/lists/favorites"  className="nav-link " >
                                <i className="fa fa-list "></i> Favorites
                            </Link>
                        </li>
                    s
                        <li className="nav-item">
                            <button className="nav-link " onClick={()=>onClickSignout()}> 
                                <i className="fa fa-sign-out"></i> Sign out
                            </button>
                        </li>
                        </React.Fragment>
                     : 
                    <React.Fragment>
                        <li className="nav-item">
                            <Link className="nav-link"  to="/login" >
                                <i className="fa fa-sign-in"></i> Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link "  to="/signup" >
                                <i className="fa fa-user"></i> Register
                            </Link>
                        </li>
                    </React.Fragment>
         }         
           </ul>
                    </div>
                    
                </div>
        </div>

        <div className="navbar-collapse collapse w-100" id="navbar">
            <ul className="navbar-nav ml-auto">
        
        
       <CategoryNavComponent/> 


        <li className="nav-item-"> <Link to="/support" className="nav-link">Support</Link></li>
                <li className="nav-item">
                <button onClick={()=>setShowSrch(true)} className="btn btn-transp btnSearch"><i className="fa fa-search"></i></button>
                </li>
               
                  <li className="nav-item dropdown" id="desk-acct-toggle">
                            <a  className="nav-link dropdown-toggle" data-toggle="dropdown" ><i className="fa fa-user-circle fa-lg"></i></a>
                            <div className="dropdown-menu" style={{position:"abosolute",top:'20'}} >
                            {/* { token['auth-token'] ?  */}
                            { isAuth ?
                                    <React.Fragment>
                                        <Link to="/user/profile"  className="dropdown-item">My Profile</Link>
                                      
                                        <Link to="/lists/favorites"  className="dropdown-item">Wish List</Link>
                                        <Link to="/user/orders"  className="dropdown-item">My Orders</Link>
                                        <Link to="/lists/wallet"  className="dropdown-item">My Wallet</Link>
                                       <Link to="/lists/addresses"  className="dropdown-item">My Addresses</Link>
                                     
                                        <button className="dropdown-item " onClick={()=>onClickSignout()}>Sign out</button>
                                    </React.Fragment>
                                 : 
                                 <React.Fragment>
                                     <Link to="/login"  className="dropdown-item">Login</Link>
                                     
                                     <Link to="/signup"  className="dropdown-item">Register</Link>
                                       
                              
                                </React.Fragment>
                             } 
                            </div>
                  </li>
                    

                {/* <span className="ctgry-nav-mobile">
                    <li className="nav-item-mobile"> <Link to="/support" className="nav-link">Support</Link></li>
                     <CategoryNavMobileComponent /> 
                </span> */}

               <li className="nav-item" id="cart-link-desk">
                    <Link className="nav-link" to="/cart" >
                        <i className="fa fa-shopping-cart fa-lg"></i> <span className="cart-item-cnt">{cartItems.length ? cartItems.length : 0}</span>
                    </Link>
                </li>
                  
            </ul>
        </div>
        
        <div className="modal fade" id="userNavModal" role="dialog" style={{top:'50px'}}>
            <div className="modal-dialog">
              <div className="modal-content">
              
            <ul className="navbar-nav mr-auto">
                {/* { token['auth-token'] ?  */}
                {isAuth ?
                <React.Fragment>
                    <li className="nav-item"><Link to="/user/profile"  className="nav-link">Profile</Link> </li>
                   
                    <li className="nav-item"><Link to="/lists/favorites"  className="nav-link">Wish List</Link></li>
                    <li className="nav-item"><Link to="/user/orders"  className="nav-link">My Orders</Link></li>
                    <li className="nav-item"><Link to="/lists/wallet"  className="nav-link">My Wallet</Link></li>
                     <li className="nav-item"><Link to="/lists/addresses"  className="nav-link">My Addresses</Link></li>
                    <li className="nav-item"><button className="nav-link " onClick={()=>onClickSignout()}>  Sign out </button></li>
                </React.Fragment>
             : 
              <React.Fragment>
                <li className="nav-item"><Link className="nav-link" to="/login" ><i className="fa fa-sign-in"></i> Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/signup" ><i className="fa fa-user"></i> Register</Link></li>
             </React.Fragment>
            }    
            </ul>
           </div>
         </div>
        </div>

               </React.Fragment> }
         {/* <div className="mobile-search" style={{width:"100%",clear:"left",paddingBottom:"10px"}}>
             <div>
                <form  style={{width:"100%"}} id="mobile-search-form" onSubmit={e=>onSearchSubmit(e)}>
        <div className="md-form ml-auto">
            <input  style={{width:"80%"}} id="srch-box" type="text" placeholder="Search" aria-label="Search" onChange={e=>setSrchTerm(e.target.value)}/>
                <button type="submit" className="btn btn-theme" id="srch-btn"><i className="fa fa-search fa-lg"></i></button>
        </div>
                </form>
            </div>  
        </div> */}
    </div>
 </nav>   
</div>
</header>
)
}