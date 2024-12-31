const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.token
    if (!token) {
        return res.status(404).json({
            message: "Token not found!"
        })
    }
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
        if (decoded.role !== "admin" && decoded.role !== "superAdmin") {
            return res.status(403).json({
                message: "You are not admin!"
            })
        }
    next()
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {verifyToken}