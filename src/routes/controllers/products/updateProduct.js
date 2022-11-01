const { Product } = require("../../../db");
const { getProduct } = require("./getProductDetail");

const updateProduct = async (req, res) => {
  console.log(req.body)
  const { id, name, price, description, stock, images } = req.body;
  
  try {
    await Product.update(
      {
        name,
        price: price && Number.parseFloat(price).toFixed(2), // convertir a float!!!
        description, 
        stock: stock && Number.parseInt(stock),
        images, 
      },
      {
        where: {
          id: Number.parseInt(id),
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
