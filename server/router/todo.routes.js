const {Router} = require("express")
const { addData, getData, updateData, deleteData } = require("../controller/todo.controller")
const {verifyToken} = require("../auth.middleware/middleware")
const routerApp = Router()
const {} = require("../devTools")

///////////////////////////// routers

routerApp.get("/get", getData)
routerApp.post("/add", addData)
routerApp.put("/update/:id", updateData)
routerApp.delete("/delete/:id", deleteData)

module.exports = routerApp