import React, { useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/ProductItem/ProductItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import Filters from "./Filters";
import LoadMore from "./LoadMore";


export default function Products(){
    const state = React.useContext(GlobalState)
    const [products , setProducts] = state.ProductsApi.products
    const [isAdmin] = state.userApi.isAdmin
    const [token] = state.token
    const [callback , setCallback] = state.ProductsApi.callback
    const [isCheck , setIsCheck] = useState(false)
    const [loading , setLoading] = useState(false)

    const handleCheck = (id)=>{
        products.forEach(product=>{
            if(product._id===id){
                product.checked = !product.checked
            }
        })
        setProducts([...products])
    }
   const deleteProduct = async(id , public_id)=>{
       try {
           setLoading(true)
           const destroyImg =  axios.delete('/api/destroy' , {public_id} , {
               headers:{Authorization:token}
           })
           const deleteProduct = axios.delete(`/api/products/${id}` , {
            headers:{Authorization:token}
           })
           await destroyImg
           await deleteProduct
           setCallback(!callback)
           setLoading(false)
       } catch (error) {
           alert(error.response.data.msg)
       }
   }

   const checkAll = ()=>{
       products.forEach(product=>{
           product.checked = !isCheck
       })
       setProducts([...products])
       setIsCheck(!isCheck)
   }
   const deleteAll = ()=>{
       products.forEach(product=>{
           if(product.checked){
               deleteProduct(product._id , product.images.public_id)
           }
       })
   }
   if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters />
        {
            isAdmin && 
         <div className="delete-all">
             <span>Select All</span>
             <input type="checkbox"  checked={isCheck} onChange={checkAll}></input>
             <button onClick={deleteAll} >Delete All</button>
         </div>

            
        }
        <div className="products">
            {products.map((product)=>{
                return <ProductItem key={product._id} product={product} isAdmin={isAdmin}
                 deleteProduct={deleteProduct}  handleCheck={handleCheck} />
            })}
        </div>
        <LoadMore />
        {products.length===0 && <Loading />}
        </>
    )
}