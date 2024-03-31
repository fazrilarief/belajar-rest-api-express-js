const express = require("express");
const prisma = require("../../config/prisma");

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  editProductById,
} = require("./product.services");

const router = express.Router();

/* CRUD */

// GET ALL PRODUCT DATA
router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

// GET SPESIFIC PRODUCT DATA
router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(productId);
    res.send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// CREATE PRODUCT DATA
router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;
    const product = await createProduct(newProductData);

    res.status(201).json({
      data: product,
      message: "Create product successfully!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE PRODUCT DATA
router.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    await deleteProduct(productId);

    res.status(200).send({
      message: "Product deleted successfully!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// UPDATE PRODUCT DATA
router.put("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id); // get id produk dari param url
    const productData = req.body;

    const product = await editProductById(productId, productData);

    if (
      !(
        productData.name &&
        productData.price &&
        productData.description &&
        productData.image
      )
    ) {
      res.status(400).send("Some fields are missing!");
    }

    res.status(200).json({
      data: product,
      message: "Product updated successfully!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// UPDATE PRODUCT DATA BY ID
router.patch("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productData = req.body;

    const product = await editProductById(productId, productData);

    res.status(200).json({
      data: product,
      message: "Product data updated successfully!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
