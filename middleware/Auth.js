import jwt from "jsonwebtoken";
import userSchema from "../models/userModel.js";

const verifyAdministratorEditor = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
     const user = await userSchema.findById(decoded.id);

      if (user.role == "Administrator" || user.role == "Editor") return next();
      else res.status(401).json({
        msg: "You are not authorized to access that functionality!"
      });      
      
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
  if (!token) {
    let e = new Error(`Token ${token} invalid!`);
    res.status(400).json({ msg: e.message });
    next();
  }
};
const verifyAdministrator = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userSchema.findById(decoded.id);
      
      if (user.role == "Administrator")  return next();
      else res.status(401).json({ msg: "You are not authorized to access that functionality!" });
      
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  }
  if (!token) {
    let e = new Error(`Token ${token} invalid!`);
    res.status(400).json({ msg: e.message});
    next();
  }
};
const verifyUser = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userSchema.findById(decoded.id);

      if (user) return next();
      else res.status(401).json({
        msg: "You are not authorized to access that functionality!"
      });

    } catch (e) {
      res.status(400).json({ msg: e.message});
    }
  }
  if (!token) {
    let e = new Error(`Token ${token} invalid!`);
    res.status(400).json({ msg: e.message});
    next();
  }
};
export { 
  verifyAdministratorEditor,
  verifyUser,
  verifyAdministrator
};