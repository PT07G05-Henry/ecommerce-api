const { Product, Category } = require("../../../db");
const getProduct = async (id) => {
  return await Product.findByPk(id, {
    include: {
      model: Category,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getProductDetail = async (req, res) => {
  let id = req.params.id;
  let product = await getProduct(id);
  product
    ? res.status(200).send(product)
    : res.status(404).send({ error: "Product Not Found" });
};

module.exports = { getProductDetail };
