import express from "express";
import { verifyAdministratorEditor}  from "../middleware/Auth.js";

import {
    addProduct,
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getSku,
    countProducts,
    getStock
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", verifyAdministratorEditor, addProduct);
router.post("/getProducts", getProducts);
router.post("/getSku", getSku);
router.get("/getStock", getStock);
router.post("/countProducts", countProducts);

router
    .route("/:_id")
    .get(verifyAdministratorEditor, getProduct)
    .put(verifyAdministratorEditor, updateProduct)
    .delete(verifyAdministratorEditor, deleteProduct);

export default router;