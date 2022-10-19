const { Product } = require("../../../db");
const deleteProduct = async (req, res) => {
  const { id } = req.body;
  try {
    await Product.destroy({
      where: {
        id: id,
      },
    });
    res.status(200);
    res.send("Product Removed Successfully");
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { deleteProduct };
