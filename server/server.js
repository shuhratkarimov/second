const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT
const app = express();
const routerApp = require("../server/router/todo.routes");
const routerAuth = require("../server/router/auth.routes")
const bodyParser = require("body-parser")
app.use(cors())
app.use(bodyParser.json())
app.use(routerApp)
app.use(routerAuth)

app.listen(PORT, () => {
  console.log("server is running on the port: " + PORT);
});
