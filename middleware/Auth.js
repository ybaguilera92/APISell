import jwt from "jsonwebtoken";
import userSchema from "../models/userModel.js";

const Auth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userSchema
        .findById(decoded.id)
        .select("-password -enabled -token -createdAt -updatedAt -__v");
      if (req.user.role == "Administrator" || req.user.role == "Editor") {
        return next();
      } else { 
        res.status(401).json({
          msg: "You are not authorized to access that functionality!"
        });
      }
      
    } catch (e) {
      res.status(401).json({ msg: e.message });
    }
  }

  if (!token) {
    let e = new Error(`Token ${token} invalid!`);
    res.status(401).json({ msg: e.message });
    next();
  }

};

export default Auth;