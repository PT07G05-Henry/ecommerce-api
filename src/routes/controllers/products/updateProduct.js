const { Product } = require("../../../db");
const { getProduct } = require("./getProductDetail");
const updateProduct = async (req, res) => {
  const { id, name, price, description, stock, images } = req.body.update;
  try {
    await Product.update(
      {
        name,
        price, // convertir a float!!!
        description,
        stock,
        images,
      },
      {
        where: {
          id,
        },
      }
    );
    let productUpdate = await getProduct(id);
    res.status(200);
    res.send(productUpdate);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { updateProduct };
