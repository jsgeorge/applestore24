// Add to store site
//****************************************************************************** */
import React, { useEffect, useState} from "react";
import {Link, useParams, useNavigate, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  {addShipping}  from "../../../actions/orderActions";
import {useCookies } from 'react-cookie';
import { CheckoutStepsComponent } from "../../layout/checkoutSteps";

export default function ShippingPage(){
    const navigate = useNavigate()
    const ship = useSelector((state) => state.ship)
    const {ordShipping} = ship
    // const [token, setToken] = useCookies(['auth-token']);
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [region, setRegion] = useState('')
    const [postalcode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const dispatch = useDispatch()
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    
    const [errMsg, setErrMsg] = useState('')
   
    // if (!token['auth-token']) navigate('/login')
     
      const onSaveSubmit = (e) => {
        setErrMsg('')
        if (!firstname) setErrMsg("INvalid/missing first name")
        else if (!lastname) setErrMsg("INvalid/missing last name")
        else if (!address) setErrMsg("INvalid/missing address")
        else if (!city) setErrMsg("INvalid/missing city")
        else if (!region) setErrMsg("INvalid/missing region")
        else if (!postalcode) setErrMsg("INvalid/missing postalcode")
        else if (!country) setErrMsg("INvalid/missing country")
        else {
            let data = {
              firstname: firstname,
              lastname: lastname, 
              address : address,
              address2 : address2,
              city : city,
              region : region,
              postalcode : postalcode,
              country : country
                }
            dispatch(addShipping( data))
                
            navigate('/checkout/payment')
        }
    }
    

       useEffect(()=>{
        if(!userInfo)
        navigate('/login')
     }, [navigate])
  
    return (
        <div>
  
              <div className="page-wrapper">
                <div className="container">
                    <CheckoutStepsComponent step="Shipping" />
                       
                 <div className="row">
                    <div className="col-md-3 col-sm-3"></div>
                    <div className="col-md-6 col-sm-6 col-xs-9" >
                    {errMsg && <div className="alert alert-danger" role="alert">{errMsg}</div>}
                 
                    <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstname" className="form-control" onChange={e=>setFirstName(e.target.value)}/> 
                    {/* value={ordShipping[0].firstname ? ordShipping[0].firstname : ''}/> */}
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastname" className="form-control" onChange={e=>setLastName(e.target.value)}/>
                </div>
                    <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" className="form-control" onChange={e=>setAddress(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Address 2</label>
                    <input type="text" name="address2" className="form-control" onChange={e=>setAddress2(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" className="form-control" onChange={e=>setCity(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Region</label>
                    <input type="text" name="region" className="form-control" onChange={e=>setRegion(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Postal COde</label>
                    <input type="text" name="postalcode" className="form-control" onChange={e=>setPostalCode(e.target.value)}/>

                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input type="text" name="country" className="form-control" onChange={e=>setCountry(e.target.value)}/>

                </div>

                 
                   <div className="cmd-line">
                    <Link to={'/'} className="btn btn-primary">continue shopping</Link> <button className="btn btn-theme" style={{float:"right"}}  onClick={(e)=>onSaveSubmit(e)}>Checkout</button>
                    </div>
                    </div>
                  </div>

                 </div>
          </div>
        </div>
    )

}