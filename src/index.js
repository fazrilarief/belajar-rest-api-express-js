const express = require("express"); // Inisialisasi express
const dotenv = require("dotenv"); // inisialisasi dotenv

const app = express(); // panggil method express ke variabel app

dotenv.config(); // agar bisa membaca config di file .env

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

const productController = require("./product/product.controllers");

app.use("/products", productController);

// Error Handling
app.use(handleErrorRoutes);
