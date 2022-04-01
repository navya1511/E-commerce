import React, { useContext , useState } from "react";
import { GlobalState } from "../../GlobalState";
import {FaShoppingCart} from "react-icons/fa"
import {GrFormClose} from "react-icons/gr"
import {FiMenu} from "react-icons/fi"
import {MdAutoAwesome} from "react-icons/md"
import { Link } from "react-router-dom";
import axios from "axios";


export default function Header(){
    const state = useContext(GlobalState)
    //console.log(state)
     const [isLogged] = state.userApi.isLogged
    const [isAdmin] = state.userApi.isAdmin
    const [cart] = state.userApi.cart
    const [menu , setMenu] = useState(false)

    const logoutUser = async ()=>{
        await axios.get("/user/logout")
        localStorage.removeItem('firstLogin')
        window.location.href = "/"
    }

    const adminRouter = ()=>{
        return (
            <>
            <li onClick={()=>setMenu(!menu)}><Link to="/create_product">Create Product</Link></li>
            <li onClick={()=>setMenu(!menu)}><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const loggedUser = () =>{
        return (
            <>
           <li onClick={()=>setMenu(!menu)}><Link to="/history">History</Link></li>
           <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
        </>
        )
    }
    
    const styleMenu = {
        left: menu ? 0 : "-100%"
    }
   return (
   <header>
     <div className="menu" onClick={()=>setMenu(!menu)}>
         <FiMenu className="icon" width="30" />
     </div>
     <div className="logo">
         <h1>
         <Link to="/">{ isAdmin ? 'Admin' : "Navya Shop"}</Link>
         </h1>
     </div>
     <ul style={styleMenu}>
         <li onClick={()=>setMenu(!menu)}><Link to="/">{ isAdmin ? 'Products' : "Shop"}</Link></li>
        
        {isAdmin && adminRouter()}
        { isLogged ? loggedUser()
        : <li onClick={()=>setMenu(!menu)}><Link to="/login">Login <MdAutoAwesome /> Register</Link></li>
        }
         <li  onClick={()=>setMenu(!menu)}><Link to="/"><GrFormClose className="icon menu"   /></Link></li>

     </ul>
     {
         isAdmin ? ''
     : <div className="cart-icon" >
         <span>{cart.length}</span>
        <Link to="/cart"><FaShoppingCart className="icon"/></Link>
     </div>
}
   </header>
   )
}