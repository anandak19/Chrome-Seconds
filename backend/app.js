import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

export const app = express();

app.use(cors());
// set limit for data save size 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Chrome Seconds backend");
});

app.use("/api", userRoutes);
app.use("/api", productRoutes);