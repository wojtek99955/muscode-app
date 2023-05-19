const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const connectDB = require("./config/dbConn");
const corsOptions = require("./config/allowedOrigins");
const mongoose = require("mongoose");

connectDB();

const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));

app.use(express.json());

app.use("/todos", require("./routes/todoRoutes"));
app.use("/products", require("./routes/productRoutes"))

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});