const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "default";

// Generate JWT
exports.generateToken = (user) => {
  return jwt.sign({id: user._id, role: user.role}, SECRET_KEY, {
    expiresIn: "1h"
  });
};


exports.verifyToken = (token) => {
  try{
    return jwt.verify(token, SECRET_KEY);
  }catch(err){
    return null;
  }
}