import React,{useState} from "react";
import axios from "axios"

export default function ProductsApi(){
    const [products , setProducts] = React.useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)


  
   React.useEffect(()=>{
    const getProducts = async ()=>{
        const res = await axios.get(`/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`)
        setProducts(res.data.products)
        setResult(res.data.result)
    }
       getProducts()
   },[callback, category , page , sort , search ])
    return {
        products:[products , setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]

    }
}