import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// secret key to create a token------
const SECRET_KEY = "chrome_ak";

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

  // generate a token for user and send it
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

    // Generate a JWT token
    const token = jwt.sign(
      { id: requestedUser._id },
      SECRET_KEY,
      { expiresIn: "7h" } // Token expires in 7 hour
    );

    const userImage = requestedUser.userImage;

    // send the user data except password and token to clint
    res.status(200).json({ userImage, token });
  } catch (err) {
    console.error("Error finding user: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfileData = async (req, res) => {
  // extract id from header
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, SECRET_KEY);
  const userId = decoded.id;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfileImage = async (req, res) => {
  const userImage = req.body.image;
  console.log(userImage);
  // extract id from header
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, SECRET_KEY);
  const userId = decoded.id;

  try {
    const updatedUserData = await UserModel.findByIdAndUpdate(
      userId,
      { profileImage: userImage },
      { new: true }
    );
    if (!updatedUserData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUserData);
  } catch (error) {
    res.status(500).json({ message: "Server error" + err});
  }
};
