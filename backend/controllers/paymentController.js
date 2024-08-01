import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  console.log(req.body);
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }
    var options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "rcp1",
    };
    instance.orders.create(options, function (err, order) {
      console.log(order);
      res.send({ orderId: order.id, amount: amount });
    });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// post 
export const orderSuccess = async (req, res) => {
  try {
    const { orderId, paymentId } = req.query;
    res.json({ orderId, paymentId });
  } catch (error) {
    res.status(500).send(error);
  }
};

// get 
export const orderCancel = async (req, res) => {
  try {
    res.send("Payment cancelled");
  } catch (error) {
    res.status(500).send(error);
  }
};
