import express from "express";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  getSomeProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.get("/products/product/eight", getSomeProducts);
// admin --- 
router.post("/products", createProduct);
router.delete("/products/:productId", deleteProduct);

export default router;