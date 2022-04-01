import axios from "axios"
import React, { useEffect } from "react"
import UserAPI from "./api/UserAPI"
import ProductsApi from "./api/ProductsApi"
import CategoriesApi from "./api/CategoriesApi"

export const GlobalState = React.createContext()

export const DataProvider = ({children})=>{
    const [token , setToken] = React.useState(false)
 

    const refreshToken = async ()=>{
      const res = await axios.get("/user/refresh_token")
      setToken(res.data.accessToken)
      
    }
    useEffect(()=>{
      const firstLogin = localStorage.getItem('firstLogin')
      if(firstLogin)  {
        setTimeout(() => {
          refreshToken()
      }, 10 * 60 * 1000)
  
      refreshToken()}
     
    },[])
    
    const state={
        token:[token , setToken],
        ProductsApi:ProductsApi(),
       userApi: UserAPI(token),
       CategoriesApi : CategoriesApi()
    }


  return <GlobalState.Provider value={state}>
      
       {children}
   </GlobalState.Provider>
}
