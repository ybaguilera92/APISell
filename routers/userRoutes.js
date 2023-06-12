import express from "express";
import { verifyAdministrator}  from "../middleware/Auth.js";

import {
    signIn,
    addUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    registerUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", signIn);
router.post("/register", registerUser);
router.post("/addUser", verifyAdministrator, addUser);
router.get("/getUsers", verifyAdministrator, getUsers);

router
    .route("/:_id")
    .get(verifyAdministrator, getUser)
    .put(verifyAdministrator, updateUser)
    .delete(verifyAdministrator, deleteUser);

export default router;
