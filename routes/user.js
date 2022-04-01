const express = require("express")
const router = express.Router()
const {register , login, refreshToken , logout , getUser, addCart, history} = require("../controllers/userController")
const auth = require("../middleware/auth")

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/logout").get(logout)
router.route("/refresh_token").get(refreshToken)
router.route("/info").get(auth , getUser)
router.route("/addCart").patch(auth , addCart)
router.route("/history").get(auth ,history )

module.exports = router