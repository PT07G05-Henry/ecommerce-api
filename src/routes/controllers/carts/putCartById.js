const { Cart } = require("../../../db");

const putCartById = async (req, res) => {
  const userId = req.body.userId;
  const products = req.body.products;
  try {
    await Cart.update(
        {
          items: products
        },
        {
          where: {
            userId: userId,
          },
        }
      );

    res.status(200).send({items:products, userId:userId});
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { putCartById };
