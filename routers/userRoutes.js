import express from "express";
import Auth from "../middleware/Auth.js";

import {
    signIn,
    addUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", signIn);
router.post("/addUser", Auth, addUser);
router.get("/getUsers", Auth, getUsers);

router
    .route("/modify-user/:_id")
    .get(Auth, getUser)
    .put(Auth, updateUser)
    .delete(Auth, deleteUser);

export default router;
