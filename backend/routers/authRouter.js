const router = require("express").Router()
const authController = require("../controllers/authController.js")
const { checkAuth } = require("../middleware/accessMiddleware.js")

router.post("/register", authController.postRegister)
router.post("/login", authController.postLogin)

router.get("/logout", checkAuth ,authController.getLogout)
module.exports = { router }