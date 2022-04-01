import React, { useContext } from "react";
import Cart from "./cart/Cart";
import Products from "./products/products";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { Route , Routes} from "react-router-dom"
import NotFound from "./utils/NotFound";
import DetailProduct from "./detailProduct/DetailProduct";
import Orderhistory from "./history/Orderhistory";
import OrderDetails from "./history/OrderDetails";
import Categories from "./categories/Categories";
import CreateProduct from "./createProduct/CreateProduct";

import {GlobalState} from "../../GlobalState"

export default function Pages(){
    const state = useContext(GlobalState)
    const [isAdmin] = state.userApi.isAdmin
    const [isLogged] = state.userApi.isLogged
   return (
       <Routes>
           <Route path="/" exact element={<Products />} />
           <Route path="/detail/:id" exact element={<DetailProduct />} />

           <Route path="/login" exact element={isLogged ? <NotFound /> :<Login />} />
           <Route path="/register" exact element={isLogged ? <NotFound /> :<Register />} />

           <Route path="/category" exact element={isAdmin ? <Categories /> :<NotFound />} />
           <Route path="/create_product" exact element={isAdmin ? <CreateProduct /> :<NotFound />} />
           <Route path="/edit_product/:id" exact element={isAdmin ? <CreateProduct /> :<NotFound />} />

           <Route path="/cart" exact element={<Cart />} />
           <Route path="/history" exact element = {isLogged ?  <Orderhistory /> : <NotFound /> } />
           <Route path="/history/:id" exact element = {isLogged ?  <OrderDetails/> : <NotFound /> } />
           
           

           <Route path="*" exact element={<NotFound />} />
       </Routes>
   )
}