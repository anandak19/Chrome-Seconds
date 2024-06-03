import mongoose from "mongoose";
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
