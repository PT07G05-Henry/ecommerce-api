const { Cart } = require("../../../db");

const createCart = async (req, res) => {
  const { data } = req.body;
  try {
    await Cart.createBulk(req.body);
    res.status(200).send(await Category.findAll());
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { createCategory };