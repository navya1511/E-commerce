const Product = require("../models/Product")

class APIfeatures{
    constructor(query , queryString){
        this.query = query
        this.queryString = queryString
    }
    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query
 
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))
        
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
 
     //    gte = greater than or equal
     //    lte = lesser than or equal
     //    lt = lesser than
     //    gt = greater than
        this.query.find(JSON.parse(queryStr))
          
        return this;
     }
 
     sorting(){
         if(this.queryString.sort){
             const sortBy = this.queryString.sort.split(',').join(' ')
             this.query = this.query.sort(sortBy)
         }else{
             this.query = this.query.sort('-createdAt')
         }
 
         return this;
     }
 
     paginating(){
         const page = this.queryString.page * 1 || 1
         const limit = this.queryString.limit * 1 || 9
         const skip = (page - 1) * limit;
         this.query = this.query.skip(skip).limit(limit)
         return this;
     }
 }

 const getProducts = async (req , res)=>{
     const features = new APIfeatures(Product.find() , req.query)
     .filtering().paginating().sorting()

     const products = await features.query

     res.json({
         status:"success",
         result:products.length,
         products:products
     })
 }

const createProduct = async (req , res)=>{
    const {product_id , price , title , description , content , images , category} = req.body
    if(!images){
       return res.status(400).json({msg:"No images uploaded"})
    }
    const product = await Product.findOne({product_id})
    if(product){
       return res.status(400).json({msg:"Product already existed"})
    }

    const newProduct = new Product({
        product_id , 
        price ,
         title:title.toLowerCase() , description ,
        content , images , category
    })
    await newProduct.save()

    res.status(200).json("new product created")

}

const deleteProduct = async (req , res)=>{
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"product deleted"})
}

const updateProduct = async (req , res)=>{
    const { price , title , description , content , images , category} = req.body
    if(!images){
        return res.status(400).json({msg:"No images uploaded"})
     }
      await Product.findOneAndUpdate({_id:req.params.id} , {
        price ,
        title:title.toLowerCase() , description ,
       content , images , category

     })
     res.status(200).json({msg:"product updated"})
     
}

 module.exports = {getProducts , createProduct , deleteProduct , updateProduct}