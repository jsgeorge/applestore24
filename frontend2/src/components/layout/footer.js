import React, {useState} from "react";
import {Link } from 'react-router-dom'
import {useCookies } from 'react-cookie'

export function FooterComponent(){

return (
<React.Fragment>
 {/* Intro section start  */}
<div className="intro-section">
    <div className="container">
        <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <div className="intro-text">
                    <h6>Store Location</h6>
                    500 Montgomery Street<br/>
                    San Francisco, CA 94133<br/>
                    info@techshed.com
                    394-334-3434
                </div>
                
                <div className="social-list-2">
                        <ul>
                            <li><a href="#" className="facebook-bg"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#" className="twitter-bg"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="#" className="google-bg"><i className="fa fa-google-plus"></i></a></li>
                            <li><a href="#" className="linkedin-bg"><i className="fa fa-linkedin"></i></a></li>
                        </ul>
                    </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <h6>Shop</h6>
                <ul className="footer-nav">
                    
                    <li><Link to="/">My Account</Link></li>
                    <li><Link to="/">Specials</Link></li>
                    <li><Link to="/">Brands</Link></li>
                    <li><Link to="/">Order History</Link></li>
                    <li><Link to="/">Contact US</Link></li>
                </ul>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <h6>Customer Support</h6>
                <ul className="footer-nav">
                <li><Link to="/">Contact Us</Link></li>
                    <li><Link to="/">Help Center</Link></li>
                    <li><Link to="/">About US</Link></li>
                    <li><Link to="/">Careers</Link></li>
                    
                </ul>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <h6>Policy</h6>
                <ul className="footer-nav">
                   
                    <li><Link to="/">Shipping {'&'} Returns</Link></li>
                    <li><Link to="/">Terms {'&'} Conditions</Link></li>
                    <li><Link to="/">Payment Methods</Link></li>
                    <li><Link to="/">FAQ</Link></li>
                </ul>
            </div>
          
        </div>
    </div>
</div>
{/* Intro section end  */}

{/* Footer start  */}
<footer className="footer">
    
    <div className="sub-footer">
        <div className="container">
                    <p>© 2022 by <a href="#">techshed Corp.</a> All Rights Reserved.</p>
            
        </div>
    </div>
</footer>
 

</React.Fragment>
)}