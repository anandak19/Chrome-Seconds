import express from "express";
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  getSomeProducts,
  updateAvailability,
  getPaginatedProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.get("/products/product/eight", getSomeProducts);

router.get("/products/paginated/page", getPaginatedProducts);

// admin --- 
router.post("/products", createProduct);
router.delete("/products/:productId", deleteProduct);
router.patch("/products/availability", updateAvailability);

export default router;