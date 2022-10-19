const { Product } = require("../../../db");
const updateProduct = async (req, res) => {
  const { id, name, price, description, stock, images } = req.body;
  try {
    await Product.update(
      {
        name: name,
        price: price,
        description: description,
        stock: stock,
        images: images,
      },
      {
        where: {
          id: id,
        },
      }
    );
    let productUpdate = await getProductDetail(id);
    res.status(200);
    res.send(productUpdate);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { updateProduct };
