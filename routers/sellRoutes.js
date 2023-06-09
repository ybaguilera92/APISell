import express from "express";
import Auth from "../middleware/Auth.js";

import {
    getGainTotal,
    getSells,
    addSell
   
} from "../controllers/sellController.js";

const router = express.Router();

router.post("/", Auth, addSell);
router.get("/getSells", getSells);
router.get("/getGainTotal", getGainTotal);


export default router;
