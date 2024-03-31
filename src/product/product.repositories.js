// Berkomunikasi dengan database
// Boleh pake ORM, boleh raw query
// Supaya kalo mau ganti2 ORM tinggal edit di file ini aja

const prisma = require("../../config/prisma");

const findProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return product;
};

const insertProductData = async (newProductData) => {
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      price: newProductData.price,
      description: newProductData.description,
      image: newProductData.image,
    },
  });

  return product;
};

const deleteProductData = async (id) => {
  await prisma.product.delete({
    where: {
      id: parseInt(id), // diubah jadi integer dulu, karena params.id defaultnya adalah string
    },
  });
};

const editProductData = async (id, productData) => {
  await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });
};

module.exports = {
  findProducts,
  findProductById,
  insertProductData,
  deleteProductData,
  editProductData,
};
