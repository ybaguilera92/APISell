import userSchema from "../models/userModel.js";
import JWT from "../helpers/generateJWT.js";
import { getAll, getOne, deleteOne} from "./handlerFactory.js";


const signIn = async (req, res) => {
  try {
  
  const { username, password } = req.body;

  const user = await userSchema.findOne({ username });

  if (!user) return res.status(400).json({ msg: `Username is not register!` });
    
  if (await user.checkoutPassword(password))
    res.json({
     res: {
       _id: user._id,
       name: user.name,
       email: user.email,
       username: user.username,
       role: user.role,
       lastName: user.lastName,
       token: JWT(user._id),
     }
    });
    else return res.status(400).json({ msg: "Password incorrect!" });
    
  } catch (error) {
     return res.status(404).json({ msg: "Fatal error!" });
  }
};


const addUser = async (req, res) => {

  try {
    const { email, username} = req.body;

    const issetUser = await userSchema.findOne({ username });
    const issetEmail = await userSchema.findOne({ email });

    if (issetEmail) return res.status(400).json({ msg: `This email is already registered!` });
    
    if (issetUser)  return res.status(400).json({ msg: `This username is already registered!`});
      
    const user = new userSchema(req.body);
    
    await user.save();
    res.json({
      msg: `New user created!`,
      res: user
    });
  } catch (err) {
     return res.status(404).json({ msg: "Fatal error!"});
  }
};
const registerUser = async (req, res) => {
  
  try {
    const { email, username} = req.body;

    const issetUser = await userSchema.findOne({ username });
    const issetEmail = await userSchema.findOne({ email });

    if (issetEmail) return res.status(400).json({ msg: `This email is already registered!` });
    
    if (issetUser)  return res.status(400).json({ msg: `This username is already registered!`});
      
    const user = new userSchema(req.body);

    user.role = "Other";

    await user.save();
    res.json({
      msg: `New user registered!`,
      res: user
    });
  } catch (err) {
    return res.status(404).json({ msg: "Fatal error!"});
  }
};
const updateUser = async (req, res) => {
  

  try {
    const { _id } = req.params;
    const issetUser = await userSchema.findById(_id);
    if (!issetUser) return res.status(404).json({ msg: "No user found with that ID!" });

    issetUser.name = req.body.name || issetUser.name;
    issetUser.lastName = req.body.lastName || issetUser.lastName;
    issetUser.email = req.body.email || issetUser.email;
    issetUser.password = req.body.password || issetUser.password;
    issetUser.role = req.body.role || issetUser.role;
    issetUser.enabled = req.body.enabled;

    const userStored = await issetUser.save();

    res.json({res:userStored});

  } catch (err) {
    return res.status(404).json({ msg: "Fatal error!" });
  }
}


const getUsers = getAll(userSchema);
const getUser = getOne(userSchema);
const deleteUser = deleteOne(userSchema);


export {
  signIn,
  addUser,
  updateUser,
  getUsers,
  getUser,
  deleteUser, 
  registerUser,
};