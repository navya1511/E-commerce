import { useContext } from "react"
import {Link} from "react-router-dom"
import { GlobalState } from "../../../../GlobalState"
export default function ProductItem({product , isAdmin , deleteProduct , handleCheck}){
    // console.log(product)
    const state = useContext(GlobalState)
    const addCart = state.userApi.addCart
    
    return (
         <div className="product-card">

             {isAdmin && <input 
             type= "checkbox" 
             product={product.checked}
             onChange={()=>handleCheck(product._id)}
             />}
            <img src={product.images.url} alt="" />

            <div className="product-box">
                <h2 title={product.title}>{product.title}</h2>
                <span>{product.price}</span>
                <p>{product.description}</p>
            </div>
            
                <div className="row_btn">
                    {
                isAdmin ? 
                <>
                
                <Link id="btn-buy" to="#!" onClick={()=>deleteProduct(product._id , product.images.public_id)} >
                Delete
                </Link>
                <Link id="btn-view" to={`/edit_product/${product._id}`}>
                Edit
                </Link>
                
                </>
            :<>
                <Link id="btn-buy" to="#!" onClick={()=>addCart(product)} >
                Buy
                </Link>
                <Link id="btn-view" to={`/detail/${product._id}`}>
                View
                </Link>
            </>
      }
     </div>
         </div>
    )
}