const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String ,
        required:[true , "Please provide a name"],
        trim:true,
        minlength:3,
        maxlength:20
    },
    email:{
        type:String,
        required:[true , "Please provide an e-mail"],
        unique:true
    },
    password:{
        type:String,
        required:[true , "Please provide a password"],
        minlength:6
    },
    role:{
        type:Number,
        default:0
    },
    cart:{
        type:Array,
        default:[]
    },
     

},
{ timestamps:true }
)

module.exports = mongoose.model("User" , userSchema)