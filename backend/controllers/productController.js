import ProductModel from "../models/product.model.js";

// function to get all products 
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// function to create new product 
export const createProduct = async (req, res) => {
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
    gender,
  } = req.body;

  try {
    const existingProduct = await ProductModel.findOne({ productId });

    if (existingProduct) {
      return res.status(400).json({ error: "Product with same ID exists" });
    }

    const newProduct = new ProductModel({
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
      gender,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error adding product: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// function to delete a product 
export const deleteProduct = async (req, res) => {
  const productId = req.body.productId;

  try {
    const deletedProduct = await ProductModel.findOneAndDelete({ productId });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
  } catch (err) {
    console.error("Error deleting product: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//function to get details of one product  
export const getProductById = async (req, res) => {
  const id = req.params.id;

  try {
    const selectedProduct = await ProductModel.findById(id);

    if (!selectedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(selectedProduct);
  } catch (err) {
    console.error("Error getting product details: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
