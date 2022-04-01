const express = require("express")
const { getCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/categoryController")
const router = express.Router()
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")


router.route("/category").get(getCategories).post(auth , authAdmin , createCategory)

router.route("/category/:id")
.put(auth, authAdmin , updateCategory)
.delete(auth , authAdmin , deleteCategory)

module.exports = router