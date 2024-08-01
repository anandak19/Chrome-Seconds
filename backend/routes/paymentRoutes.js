import express from "express";
import { createOrder, orderCancel, orderSuccess } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/order/create-order", createOrder);
router.post("./order/order-success", orderSuccess);
router.get("./order/order-cancel", orderCancel)

export default router;