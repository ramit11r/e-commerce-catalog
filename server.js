const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

app.use(express.json());

// serve frontend
app.use(express.static("public"));

connectDB();

app.use("/products", productRoutes);

// fallback route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});