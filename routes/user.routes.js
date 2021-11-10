const router = require("express").Router();
const services = require("../services/user.services");
const servicePassword = require("../services/forgotPassword.services");

router.post("/register",services.register);
router.post("/login",services.login);
router.post("/login/forgot-password",servicePassword.forgotPassword);
router.get("/forgot-password/:userId/:token",servicePassword.linkVerify);
router.post("/forgot-password/:userId/:token",servicePassword.updatePassword);

module.exports = router;