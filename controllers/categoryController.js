const Category = require("../models/Category")
const Product = require("../models/Product")
const { StatusCodes } = require("http-status-codes")

const getCategories = async (req , res)=>{
    const categories = await Category.find()
    res.status(200).json(categories)
}

const createCategory = async (req , res)=>{
    //if user has role === 1 
    //only admin can create a category
    const {name } = req.body
    const category = await Category.findOne({name})
    if(category){
      return  res.status(StatusCodes.BAD_REQUEST).json({msg:"Category already existed"})
    }
    const newCategory = new Category({name})
    await newCategory.save()

    res.status(StatusCodes.CREATED).json({msg:"Category created"})
}

const deleteCategory = async (req , res)=>{
    const products = await Product.findOne({category:req.params.id})
    if(products){
      return  res.status(StatusCodes.BAD_REQUEST).json({msg:"Delete all the products of this category"})
    }
    await Category.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.OK).json({msg:"Category deleted"})

}
const updateCategory = async (req , res)=>{
    const {name} = req.body
    await Category.findOneAndUpdate({_id:req.params.id} , {name})
    res.status(StatusCodes.OK).json({msg:"Category Updated"})
}

module.exports = {getCategories , createCategory , deleteCategory , updateCategory}