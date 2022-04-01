const router = require("express").Router()
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")
const {getPayments , createPayments} = require("../controllers/paymentController")


router.route("/payment").get(auth , authAdmin , getPayments).post(auth , createPayments)

module.exports = router