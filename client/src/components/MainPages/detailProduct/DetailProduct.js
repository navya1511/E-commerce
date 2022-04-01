import React from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/ProductItem/ProductItem";
import { useParams , Link } from "react-router-dom";

export default function DetailProduct(){
    const params = useParams()
    const  state = React.useContext(GlobalState)
    const [products ] = state.ProductsApi.products
    const addCart = state.userApi.addCart

    const [detailProduct , setDetailProduct] = React.useState([])
  

    React.useEffect(()=>{
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id){
                    setDetailProduct(product)
                }
                
            });
        }
    },[params.id , products])
  
    if(detailProduct.length === 0){
        return null
    }
    return (
        <>
        <div className="detail">
            <img src={detailProduct.images.url}  alt=""/>
            <div className="box-details">
                <div className="row">
                    <h2>{detailProduct.title}</h2>
                    <h6>#id : {detailProduct.product_id}</h6>
                </div>
                <span>{detailProduct.price}</span>
                <p>{detailProduct.description}</p>
                <p>{detailProduct.content}</p>
                <p>Sold: {detailProduct.sold}</p>
                <Link to="/cart" className="cart"
                onClick={()=> addCart(detailProduct)}
                >
                    Buy Now
                </Link>
            </div>
        </div>
        <div>
            <h2>Related Products</h2>
            <div className="products">
                {products.map(product=>{
                    return product.category === detailProduct.category 
                    ? <ProductItem  key={product._id} product={product} /> : null
                })}
            </div>
        </div>

        </>
    )
}