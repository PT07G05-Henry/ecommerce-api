const { Cart } = require("../../../db");

const deleteCartById = async (req, res) => {
  const { userId } = req.body;
  try {
    await Cart.destroy({
      where: {
        userId: userId,
      },
    });
    res.status(200);
    res.send([]);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { deleteCartById };
