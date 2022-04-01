const express = require("express")
const router = express.Router()
const cloudinary = require("cloudinary")
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")
const { uploadImage, removeImage } = require("../controllers/imageController")


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET 
  });

  //UPLOAD IMAGE ONLY ADMIN CAN USE

router.route("/upload").post(auth , authAdmin , uploadImage)
router.route("/destroy").post(auth , authAdmin ,removeImage)

module.exports = router