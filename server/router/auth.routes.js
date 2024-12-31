const {Router} = require("express")
const { register, login } = require("../controller/auth.controller")
const routerAuth = Router()

////////////////////////////// routers

routerAuth.post("/register", register)
routerAuth.post("/login", login)

module.exports = routerAuth