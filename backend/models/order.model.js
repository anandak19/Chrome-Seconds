import mongoose from "mongoose";

// Define the Order schema
const orderSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  order: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  userId: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    default: () => new Date(),
  },
  isPaid: {
    type: Boolean,
    default: false
  },
}, { collection: 'Orders' });


export default mongoose.model("Order", orderSchema);
