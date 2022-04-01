const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Payments = require("../models/Payment")
const {StatusCodes} = require("http-status-codes")


const register = async (req , res)=>{
    const {name , email , password} = req.body
    const user = await User.findOne({email})
    if(user){
       return res.status(StatusCodes.BAD_REQUEST).json({msg:"This email already exists"})
    }
    if(password.length <6){
       return res.status(StatusCodes.BAD_REQUEST).json({msg:"Password should be 6 characters long"})
    }
    // password encryption

    const hashPassword = await bcrypt.hash(password , 10)
    const newUser = new User({
        name , email , password:hashPassword
    })

    await newUser.save()

    //create jwt for authentication
    const accessToken = createAccessToken({id:newUser._id})
    const refreshToken = createRefreshToken({id:newUser._id})

    res.cookie('refreshToken' , refreshToken , {
        httpOnly:true,
        path:"/user/refresh_token",
        maxAge:7*24*60*60*1000
    })
    res.status(StatusCodes.CREATED).json({accessToken})
    

}
const login = async (req , res)=>{
    const {email , password} = req.body

    const user = await User.findOne({email})
    if(!user){
       return res.status(StatusCodes.UNAUTHORIZED).json({msg:"User does not exist"})
    }
    const isMatch = await bcrypt.compare(password , user.password)
    if(!isMatch){
       return res.status(StatusCodes.BAD_REQUEST).json({msg:"Invalid Credentials"})
    }
    const accessToken = createAccessToken({id:user._id})
    const refreshToken = createRefreshToken({id:user._id})

    res.cookie('refreshToken' , refreshToken , {
        httpOnly:true,
        path:"/user/refresh_token",
        maxAge:7*24*60*60*1000
    })
    res.status(StatusCodes.OK).json({accessToken})

}

const logout = async (req, res)=>{
    res.clearCookie("refreshToken" , {path:"/user/refresh_token"})
    return res.status(StatusCodes.OK).json({msg:"logged out"})
}

const refreshToken =  (req , res)=>{
    const rf_token = req.cookies.refreshToken
    if(!rf_token){
       return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please login or register"})
    }
    jwt.verify(rf_token , process.env.REFRESH_TOKEN , (err , user)=>{
     if(err){ return  res.status(StatusCodes.BAD_REQUEST).json({msg:"Please login or register"})}
     const accessToken = createAccessToken({id:user.id})
    res.json({accessToken})

    })
    
}
const getUser = async (req , res)=>{
    const user = await User.findById(req.user.id).select("-password")
    if(!user){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"User does not exist"})
    }
    res.status(StatusCodes.OK).json({user})
}
const addCart = async (req , res)=>{
    const user = await User.findById(req.user.id)
    if(!user){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"User does not exist"})
    }
    await User.findOneAndUpdate({
        _id:req.user.id},{
        cart:req.body.cart
    })
    return res.status(StatusCodes.OK).json({msg:"ADDED TO CART"})
}

const history = async (req , res)=>{
  const userHistory = await Payments.find({user_id:req.user.id})
  res.json(userHistory)
}
const createAccessToken = (user)=>{
    return jwt.sign(user , process.env.ACCESS_TOKEN , {expiresIn:"11m"})
}
const createRefreshToken = (user)=>{
    return jwt.sign(user , process.env.REFRESH_TOKEN , {expiresIn:"7d"})
}


module.exports = {register , login , logout , refreshToken , getUser , addCart , history}