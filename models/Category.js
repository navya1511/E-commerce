const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true , "Please provide a category"],
        unique:true
    }
})

module.exports = mongoose.model("Category" , categorySchema)