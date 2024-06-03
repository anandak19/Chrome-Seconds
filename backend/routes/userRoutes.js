import express from "express";
import {
  updateUser,
  loginUser,
  createUser,
  getProfileData,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.post("/users/login", loginUser);
router.get("/users/profile", getProfileData)

export default router;
