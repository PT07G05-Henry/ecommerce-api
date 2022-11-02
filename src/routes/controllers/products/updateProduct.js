const { Product, Category } = require("../../../db");
const { getProduct } = require("./getProductDetail");

const updateProduct = async (req, res) => {
  console.log(req.body);
  const { id, name, price, description, stock, images, categories } = req.body;

  try {
    const productDb = await getProduct(id);

    await productDb.update({
      name,
      price: price && Number.parseFloat(price).toFixed(2), // convertir a float!!!
      description,
      stock: stock && Number.parseInt(stock),
      images,
    });

    if (categories.length) await productDb.setCategories(categories);

    const productUpdate = await getProduct(id);
    res.status(200);
    res.send(productUpdate);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { updateProduct };
