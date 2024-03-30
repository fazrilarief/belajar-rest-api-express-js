const express = require("express"); // Inisialisasi express
const app = express(); // panggil method express ke variabel app
const dotenv = require("dotenv"); // inisialisasi dotenv
dotenv.config(); // agar bisa membaca config di file .env

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PORT = process.env.PORT; // membaca configurasi port di .env

app.use(express.json()); // gunakan use ini agar bida membaca body dalam bentuk json, untuk proses create

// menggunakan method "get" ke endpoint "/api" dengan paramater "request, response"
app.listen(PORT, () => {
  console.log("Express API running in port : " + PORT);
});

// untuk respon apabila endpoint tidak ditemukan
function handleErrorRoutes(req, res) {
  res.send("Oops! nothing here!");
}

app.get("/", async (req, res) => {
  res.send("Hello there!");
});

/* CRUD */

// GET ALL PRODUCT DATA
app.get("/products", async (request, response) => {
  const products = await prisma.product.findMany();
  response.send(products);
});

// GET SPESIFIC PRODUCT DATA
app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;

  const products = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
  });

  if (!products) {
    return res.status(400).send({
      message: "Product not found!",
    });
  }

  res.send(products);
});

// CREATE PRODUCT DATA
app.post("/products", async (req, res) => {
  const newProductData = req.body; // inisialisasi body agar bisa input data

  // buat variabel baru untuk menampung inputan ke dalam objek
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      price: newProductData.price,
      description: newProductData.description,
      image: newProductData.image,
    },
  });
  // ini buat run variabel tampungan data dan memberikan message sesuai dengan http request code
  res.status(201).json({
    data: product,
    message: "Create product successed",
  });
});

// DELETE PRODUCT DATA
app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id; // get id produk dulu dari endpoint

  await prisma.product.delete({
    where: {
      id: parseInt(productId), // diubah jadi integer dulu, karena params.id defaultnya adalah string
    },
  });

  res.send("Product deleted");
});

// UPDATE PRODUCT DATA
app.put("/products/:id", async (req, res) => {
  const productId = req.params.id; // get id produk dari param url
  const productData = req.body;

  if (
    !(
      productData.name &&
      productData.price &&
      productData.description &&
      productData.image
    )
  ) {
    return res.status(400).send("some fields are missing");
  }

  const product = await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });

  res.status(200).json({
    data: product,
    message: "Product updated!",
  });
});

app.use(handleErrorRoutes);
