import express from "express";
import { verifyAdministratorEditor, verifyUser}  from "../middleware/Auth.js";

import {
    getGainTotal,
    getSells,
    addSells,
   
} from "../controllers/sellController.js";

const router = express.Router();

router.post("/addSells", verifyUser, addSells);
router.get("/", verifyAdministratorEditor, getSells);

router.get("/gainTotal", verifyAdministratorEditor, getGainTotal);


export default router;
