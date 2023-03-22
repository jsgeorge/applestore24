import{ createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { cartReducer } from './reducers/cartReducers'
import { shipReducer } from './reducers/shipReducers'
import { payReducer } from './reducers/payReducers'

import { rateProductReducer,
     reviewProductReducer, 
     viewReviewsReducer } from './reducers/productReducers'
     
import { newOrderReducer,
     orderReducer, 
     orderDetailsReducer } from './reducers/orderReducers'

import { userLoginReducer, 
      userSignupReducer, 
      userUpdateProfileReducer,
      userUpdatePasswordReducer,
      userDetailsReducer, 
      userOrdersReducer, 
      usersReducer } from './reducers/userReducers'

const reducer = combineReducers({
    cart: cartReducer,
    ship: shipReducer,
    pay : payReducer,
    prodRating: rateProductReducer,
    prodReview: reviewProductReducer,
    prodReviews: viewReviewsReducer,
    newOrder : newOrderReducer,
    userLogin : userLoginReducer,
    userSignup : userSignupReducer,
    updateProfile : userUpdateProfileReducer,
    updatePassord : userUpdatePasswordReducer,
    userDetails: userDetailsReducer,
    userOrders: userOrdersReducer,
    viewOrder: orderReducer,
    orderDetails: orderDetailsReducer,
    userList: usersReducer,
})

const cartitemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []


const userinfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const shippingFromStorage = localStorage.getItem('ordShipping') ?
    JSON.parse(localStorage.getItem('ordShipping')) : {}

const paymentFromStorage = localStorage.getItem('ordPayment') ?
    JSON.parse(localStorage.getItem('ordPayment')) : {}

    const initialState = {
        cart:{cartItems: cartitemsFromStorage},
        userLogin:{userInfo: userinfoFromStorage},
        ship:{ordShipping: shippingFromStorage},
        pay:{ordPayment: paymentFromStorage}
    }
    
const middleware = [thunk]

const store = createStore(reducer, initialState,
     composeWithDevTools(applyMiddleware(...middleware)))

export default store