const { verifyToken } = require("../jwt");

exports.auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if(!token){
    return res.status(401).json({message: "No token"});
  }

  const info = verifyToken(token);
  if(!info){
    return res.status(401).json({message: 'Invalid token'});
  }
  
  req.user = info;
  next();
};