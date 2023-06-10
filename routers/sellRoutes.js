import express from "express";
import Auth from "../middleware/Auth.js";

import {
    getGainTotal,
    getSells,
    addSell,
    addSells
   
} from "../controllers/sellController.js";

const router = express.Router();

router.post("/", Auth, addSell);
router.post("/addSells", Auth, addSells);
router.get("/", Auth, getSells);
router.get("/gainTotal", Auth, getGainTotal);


export default router;
