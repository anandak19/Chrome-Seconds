import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

// function to create a new user 
export const createUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // check if the user has already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user object
    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });

    // save the user to db
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating the user: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// function to update user details 
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
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
  } catch (err) {
    console.error("Error updating user: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// function to login the user 
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const requestedUser = await UserModel.findOne({ email });

    if (!requestedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      requestedUser.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json(requestedUser);
  } catch (err) {
    console.error("Error finding user: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
