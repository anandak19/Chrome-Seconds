import express from "express";
import {
  updateUser,
  loginUser,
  createUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.post("/users/login", loginUser);

export default router;
