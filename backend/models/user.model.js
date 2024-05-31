import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { app } from "..";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      default: null,
    },
    profileImage: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    pincode: {
      type: Number,
      default: null,
    },
  },
  { collection: "users" }
);

export default mongoose.model("User", userSchema);
//----------------------- User End points start -----------------------
// route to create new user
app.post("/users", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating new user object
    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error creating user: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
