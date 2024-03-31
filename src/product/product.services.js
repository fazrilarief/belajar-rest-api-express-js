// Service layer bertujuan untuk handle business logic
// Kenapa dipisah? Supaya tanggung jawabnya ter-isolate, dan functions-nya resuable

const {
  findProducts,
  findProductById,
  insertProductData,
  deleteProductData,
  editProductData,
} = require("./product.repositories");

const getAllProducts = async () => {
  const products = await findProducts(); // findProduct() -> merupakan function yang dipanggil dari repository

  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id); // findProductById() -> merupakan function yang dipanggil dari repository

  if (!product) {
    throw Error("Product ID not found!"); // salah satu fungsi service layer, handle bussiness logic
  }

  return product;
};

const createProduct = async (newProductData) => {
  const product = await insertProductData(newProductData);

  if (
    !(
      newProductData.name &&
      newProductData.price &&
      newProductData.description &&
      newProductData.image
    )
  ) {
    throw Error("Some fields are missing!");
  }

  return product;
};

const deleteProduct = async (id) => {
  await getProductById(id);

  await deleteProductData(id);
};

const editProductById = async (id, productData) => {
  await getProductById(id);

  await editProductData(id, productData);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  editProductById,
};
