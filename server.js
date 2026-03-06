const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("E-commerce Catalog API Running");
});

app.use("/products", productRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});