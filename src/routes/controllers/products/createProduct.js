const { Product } = require("../../../db");

const createProduct = async function (req, res) {
  const { name, price, description, stock, images, categories } = req.body;

  if (!name || !price || !description || !stock) {
    res.status(400);
    return res.send("Missing to send mandatory data");
  }
  try {
    let newProduct = await Product.create({
      name,
      price: Number.parseFloat(price.replace(",", ".")).toFixed(2),
      description,
      stock: Number.parseInt(stock),
      images,
    });

    categories.forEach((c) => Number.parseInt(c));

    await newProduct.setCategories(categories);
    res.sendStatus(201);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { createProduct };
