import express from "express";
import {
  updateUser,
  loginUser,
  createUser,
  getProfileData,
  updateProfileImage,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/users", createUser);
router.patch("/users", updateUser);
router.post("/users/login", loginUser);
router.get("/users/profile", getProfileData)
router.post("/users/image", updateProfileImage)

export default router;
