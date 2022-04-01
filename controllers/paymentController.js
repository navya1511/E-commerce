const Payments = require("../models/Payment")
const User = require("../models/User")
const Products = require("../models/Product")

const getPayments = async (req , res)=>{
    const payments = await Payments.find()
    res.json(payments)
}

const createPayments = async (req , res)=>{
    const user = await User.findById(req.user.id).select('name email')
    if(!user) return res.status(500).json({msg:"User does not exist"})

    const {cart , paymentID , address} = req.body
    const {_id , name , email} = user

    const newPayment = new Payments({
        user_id:_id , name , email , paymentID , address , cart
    })

    cart.filter(item => {
        return sold(item._id, item.quantity, item.sold)
    })

    await newPayment.save()
    res.json({msg:"payment success"})
}
const sold = async (id, quantity, oldSold) =>{
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })

}
module.exports = {getPayments , createPayments}