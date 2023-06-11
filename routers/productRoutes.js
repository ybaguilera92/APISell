import express from "express";
import Auth from "../middleware/Auth.js";

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

router.post("/", Auth, addProduct);
router.post("/getProducts", getProducts);
router.post("/getSku", getSku);
router.get("/getStock", getStock);
router.post("/countProducts", countProducts);

router
    .route("/:_id")
    .get(Auth, getProduct)
    .put(Auth, updateProduct)
    .delete(Auth, deleteProduct);

export default router;