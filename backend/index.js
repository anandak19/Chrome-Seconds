// import dependecies
import express from "express";
import mongoose, { model } from "mongoose";
import cors from "cors";
import UserModel from "./models/user.model.js";
// import userModel from "./models/user.model.js";
import ProductModel from "./models/product.model.js";
import bcrypt from "bcrypt";

// declare values
export const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

// connect to mongodb using mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/chrome-seconds")
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("Error connection the mongodb", err);
  });

// initial get method
app.get("/", (req, res) => {
  res.send("Welcome to Chrome Seconds backend");
});

// route to update user,, patch
app.patch("/users/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    // Check if the password needs to be updated
    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// route to check or find a user
app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // find the user with the email
    const requestedUser = await UserModel.findOne({ email });
    if (!requestedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // matching the plain password with hashed password
    const passwordMatch = await bcrypt.compare(
      password,
      requestedUser.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    // return the user data

    res.status(200).json(requestedUser);
  } catch (error) {
    console.error("Error finding user: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//----------------------- User End points end -----------------------

//----------------------- Products End points start -----------------------

// route to get all products
app.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// route to create new product - admin
app.post("/products", async(req, res) => {
  const {
    productId,
    productName,
    description,
    category,
    brand,
    price,
    image,
    specifications,
    color,
    weight,
    material,
  } = req.body;

try {
  // check if product with same productId exists 
  const existingProduct = await ProductModel.findOne({ productId });
  if (existingProduct) {
    return res.status(400).json({ err: "Product with same Id exists" });
  }

  // create new product and save to db - admin
  const newproduct = new ProductModel({
    productId,
    productName,
    description,
    category,
    brand,
    price,
    image,
    specifications,
    color,
    weight,
    material,
  })

  const savedProduct = await newproduct.save()
  res.status(201).json(savedProduct)
} catch (error) {
  console.error("Error adding product: ", err);
  res.status(500).json({ error: "Internal server error" });
}

});

// route to delete a product - admin
app.delete("/products", async(req, res) => {
  const productId = req.body.productId;

    try {
    const deletedProduct = await ProductModel.findOneAndDelete({ productId });
    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (err) {
    console.error("Error deleting product: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
})

// route to get details of a product with id
app.get("/products/:id", async(req, res) => {
  const id = req.params.id

  try {
    // find product with id 
    const selectedProduct = await ProductModel.findById(id);

    if (selectedProduct) {
      res.status(200).json({ message: 'Product Details:', selectedProduct });
    }
  } catch (error) {
    console.error("Error geting product details: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
})

//----------------------- Products End points end -----------------------

// listen in port
app.listen(port, () => {
  console.log(`App listing at port ${port}`);
});

// post feature added and working fine
// update added, update password added
// login with email and password added
// product create, get all product, get details of one product, delete product ROUTES are added 
// all required backed is finished 
