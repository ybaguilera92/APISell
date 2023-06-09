import express from "express";
import Auth from "../middleware/Auth.js";

import {
    signIn,
    signOut,
    addUser,
    changePassword,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", signIn);
router.post("/signOut/:_res", Auth, signOut);
router.post("/addUser", Auth, addUser);
router.get("/getUsers", Auth, getUsers);

router
    .route("/modify-user/:_id")
    .post(Auth, changePassword)
    .get(Auth, getUser)
    .put(Auth, updateUser)
    .delete(Auth, deleteUser);

export default router;
