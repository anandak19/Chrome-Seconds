import express from "express";
import {
  updateUser,
  loginUser,
  createUser,
  getProfileData,
  updateProfileImage,
  updatePassword
} from "../controllers/userController.js";
import { addCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/users", createUser);
router.patch("/users", updateUser);
router.patch("/users/password", updatePassword);
router.post("/users/login", loginUser);
router.get("/users/profile", getProfileData)
// change this to patch later 
router.post("/users/add-image", updateProfileImage)
// cart routes 
router.patch("/users/add-cart", addCart)

export default router;
