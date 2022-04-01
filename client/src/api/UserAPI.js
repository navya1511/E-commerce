import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserAPI(token) {
    const [isLogged , setIsLogged] = useState(false)
    const [isAdmin , setIsAdmin] = useState(false)
    const [cart , setCart] = useState([])
    const [history  , setHistory] = useState([])
 
    useEffect(()=>{
        if(token){
            const getUser = async ()=>{
                try {
                    const res = await axios.get("/user/info" ,{
                        headers:{Authorization:token}
                    })
                    
                    setIsLogged(true)
                    res.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    console.log(res)
                    setCart(res.data.user.cart)
                    
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token])
    
    const addCart = async (product)=>{
        if(!isLogged) return alert("please login to continue buying")

        const check = cart.every(item=>{
            return item._id !== product._id
        })
        if(check){
            setCart([...cart , {...product , quantity:1}])

            await axios.patch("/user/addCart" , {cart:[...cart , {...product , quantity:1}]} , {
                headers:{Authorization:token}
            }
            ) 
        }
        else{
            alert("this product has been added to cart")
        }
    }

  return {
      isLogged : [isLogged , setIsLogged],
      isAdmin :  [isAdmin , setIsAdmin],
      cart : [cart , setCart] ,
      addCart : addCart,
      history : [history  , setHistory] 
  }
}

export default UserAPI