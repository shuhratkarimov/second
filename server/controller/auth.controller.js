const { write_file, read_file } = require("../devTools");
const data = read_file("auth.json");
const { v4 } = require("uuid");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");


////////////////////////// register

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const foundData = data.find((item) => item.email === email);
    const hashPassword = await bcryptjs.hash(password, 8);
    if (foundData) {
      return res.status(403).json({
        message: "User already exists!"
      });
    } else {
      data.push({
        id: v4(),
        username,
        email,
        password: hashPassword,
        role,
      });
    }
    write_file("auth.json", data);
    res.status(200).json({
        message: "Successfully registered!"
    });
  } catch (error) {
    throw new Error("Server error occured!");
  }
};

/////////////////////////////// login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundData = data.find((item) => item.email === email);
    if (!foundData) {
      return res.status(403).json("You should register first!");
    } 
    const comparedPassword = await bcryptjs.compare(password, foundData.password);
    if (comparedPassword) {
      token = jwt.sign({id: foundData.id, email: foundData.email, role: foundData.role}, process.env.PRIVATE_KEY, {
        expiresIn: process.env.PRIVATE_TIME
      })
    }
    res.status(200).json({
        message: "You succesfully signed in!",
        token
    });
  } catch (error) {
    throw new Error("Server error occured!");
  }
};

module.exports = {
  register,
  login
};
