const { Cart } = require("../../../db");

const getCartId = async (id) => {
  const cart = await Cart.findAll({where:{userId:id}});
  return cart;
};

const getCartById = async (req, res) => {
    const id = req.params.id
  try {
    let cart = await getCartId(id);
    if (cart.length === 0)
      return res.send([]).status(200);
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getCartById };