const { Order, User, Delivery, Product, Payment } = require("../../../db");

const getOrderDetail = async (req, res) => {
  const id = req.params.id;
  try {
    let order = await Order.findByPk(id, {
      include: [User, Delivery, Product, Payment],
    });
    order
      ? res.status(200).send(order)
      : res.status(404).send({ error: "Order Not Found" });
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
};

module.exports = { getOrderDetail };
