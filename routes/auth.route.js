const router = require("express").Router();
const authController = require("../controlles/auth.controller");

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

module.exports = router;
