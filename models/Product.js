const mongoose= require("mongoose")

const productSchema = new mongoose.Schema({
    product_id:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        
    },
    images:{
        type:Object,
        required:true,
        
    },
    content:{
        type:String,
        required:true,
        
    },
    category:{
        type:String,
        required:true,
    },
    sold:{
        type:Number,
        default:0
    },
    checked:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
}
)

module.exports = mongoose.model("Product" , productSchema)