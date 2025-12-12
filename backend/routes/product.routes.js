import express from 'express';
import {
    createProductController,
    deleteProductController,
    getAllProducts,
    getSingleProduct,
    updateProductController
} from "../controller/product.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

export const router  = express.Router();

router.post("create" , authMiddleware, createProductController);
router.get("/", getAllProducts);
router.get("/:product_id", getSingleProduct);
router.post("/update/product_id", authMiddleware, updateProductController);
router.post("/delete/product_id", authMiddleware, deleteProductController);
