import express from "express";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
// admin --- 
router.post("/products", createProduct);
router.delete("/products", deleteProduct);

export default router;
