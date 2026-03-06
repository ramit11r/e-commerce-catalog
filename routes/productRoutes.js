const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


// ADD PRODUCT
router.post("/add", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// AGGREGATION - AVERAGE PRICE BY CATEGORY
router.get("/analytics/avg-price", async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          avgPrice: { $avg: "$price" },
          totalProducts: { $sum: 1 }
        }
      }
    ]);

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// UPDATE STOCK OF VARIANT
router.put("/update-stock/:id", async (req, res) => {
  try {

    const { variantIndex, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.variants[variantIndex].stock = stock;

    await product.save();

    res.json(product);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;