const { Cart } = require("../../../db");

const getCartId = async (userId) => {
  const cart = await Cart.findAll({ where: { userId: userId } });
  return cart;
};

const postCartById = async (req, res) => {
  const userId = req.body.userId;
  const products = req.body.products;
  try {
    let cart = await getCartId(userId);
    if (cart.length === 0) {
      const newCart = await Cart.create({items:products, userId:userId});
      return res.send(newCart).status(200);
    }

    res.status(200).send(...cart);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { postCartById };