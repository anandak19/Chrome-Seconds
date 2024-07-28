import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//function to add product to cart
export const addCart = async (req, res) => {
  const { productId } = req.body;
  // separate the id from token
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decoded.id;
  console.log(userId);

  try {
    // find user by id
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the product by ID
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the user's cart by adding the product ID
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { cart: new mongoose.Types.ObjectId(product._id) } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedUser) {
      console.error("User not found:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res
      .status(500)
      .json({ error: "An error occurred", details: error.message });
  }
};

// function to return products in cart
// export const showCartItems = async (req, res) => {
//   // separate the id from token
//   const token = req.headers.authorization.split(" ")[1];
//   const decoded = jwt.verify(token, process.env.SECRET_KEY);
//   const userId = decoded.id;
//   console.log(userId);

//   try {
//     // find user by id
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {}
// };
