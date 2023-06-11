import userSchema from "../models/userModel.js";
import JWT from "../helpers/generateJWT.js";
import generateSerial from "../helpers/generateSerial.js";
import { getAll, getOne, deleteOne} from "./handlerFactory.js";


const signIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await userSchema.findOne({ username });

  if (!user) {
    return res.status(400).json({ msg: `Username is not register!` });
  }

  if (!user.enabled) {
    return res.status(403).json({ msg: "Your account is enabled!" });
  }

  if (await user.checkoutPassword(password)) {
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
  } else {  
    return res.status(400).json({ msg: "Password incorrect!" });
  }
};


const addUser = async (req, res) => {
  const { email, username } = req.body;

  const issetUser = await userSchema.findOne({  username });
  const issetEmail = await userSchema.findOne({  email });

  if (issetEmail) {
    return res.status(400).json({  msg: `This email is already registered!`  });
  }
  if (issetUser) {
    return res.status(400).json({ msg: `This username is already registered!` });
  }
  try {

    const user = new userSchema(req.body);

    user.token = generateSerial();
    
    await user.save();
    res.json({
      msg: `New user created!`,
      res: user
    });
  } catch (err) {
     return res.status(404).json({
       msg: "Fatal error!"
     });
  }
};

const updateUser = async (req, res) => {
  const { _id } = req.params;

  try {

    const issetUser = await userSchema.findById(_id);
    if (!issetUser) {
      return res.status(404).json({ msg: "No user found with that ID!" });
    }

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
const deleteUser = deleteOne(userSchema, "Users");


export {
  signIn,
  addUser,
  updateUser,
  getUsers,
  getUser,
  deleteUser, 
};