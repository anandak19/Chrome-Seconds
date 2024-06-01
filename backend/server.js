import { app } from "./app.js";
import connectDB from "./config/db.js";

const port = 3002;

connectDB();

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});