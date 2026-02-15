const router = require('express').Router();
const user = require("./userGet")
const userDelete = require("./user.delete")
const register = require("./register")
const login = require("./logrin")

router.use("/user", user)
router.use("/users/", userDelete)
router.use("/", register)
router.use("/", login)
module.exports = router;
