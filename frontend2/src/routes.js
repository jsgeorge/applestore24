import React from "react";
import {Routes, Route} from "react-router-dom";
import HomePage from "./components/pages/home";
import ProductsPage from "./components/pages/products"
import SearchProductsPage from "./components/pages/search"
import ProductDetailPage from "./components/pages/product/detail";
import LoginPage from "./components/pages/auth/login";
import RegisterPage from "./components/pages/auth/register";
import ProfilePage from './components/pages/user/profile';
import EditProfilePage from './components/pages/user/edit';
import OrdersPage from './components/pages/user/orders';
import CartPage from './components/pages/checkout/cart';
import ShippingPage from './components/pages/checkout/shipping';
import PaymentPage from './components/pages/checkout/payment';
import ReviewPage from './components/pages/checkout/review';
import OrderPlacedPage from './components/pages/checkout/orderplaced';
import NotFoundPage from './components/pages/notfound';
import AdminLoginPage from "./components/admin/pages/auth/login";
import AdminDashboardPage from "./components/admin/pages/menu/dashboard";
export const RoutesDir = () => {
    return(
          <React.Fragment>
             <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/admin" element={<AdminLoginPage/>}/>
            <Route exact path="/admin/dashboard" element={<AdminDashboardPage/>}/>
            <Route exact path="/login" element={<LoginPage/>}/>
            <Route exact path="/signup" element={<RegisterPage/>}/>
            <Route exact path="/checkout/cart/:slug" element={<CartPage/>}/>
            <Route exact path="/cart/" element={<CartPage/>}/>
            <Route exact path="checkout/shipping/" element={<ShippingPage/>}/>
            <Route exact path="checkout/payment/" element={<PaymentPage/>}/>
            <Route exact path="checkout/review/" element={<ReviewPage/>}/>
            <Route exact path="checkout/orderplaced" element={<OrderPlacedPage/>}/>
            <Route path="/products/shop"  element={<ProductsPage/>}/>
            <Route path="/search"  element={<ProductsPage/>}/>
            <Route path="/products-ctgry/:category/"  element={<ProductsPage/>}/>
            <Route path="/products/:category/:slug"  element={<ProductDetailPage/>}/>
            <Route path="/user/profile"  element={<ProfilePage />} />
            <Route path="/user/edit-profile"  element={<EditProfilePage />} />
            <Route path="/orders/:id"  element={<OrdersPage />} />
            <Route path="*"  element={<NotFoundPage />} />
      </Routes>
      </React.Fragment>
    )
}