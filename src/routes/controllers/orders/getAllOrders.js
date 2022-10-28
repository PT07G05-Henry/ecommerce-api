const { Order, User, Delivery, Product, Payment } = require("../../../db");

const getAllOrdersDb = async function (userId, status, order) {
  let orders = await Order.findAll({
    where: status
      ? {
          status: status,
        }
      : {},
    include: userId
      ? [
          {
            model: User,
            where: { id: userId },
          },
        ]
      : [{ model: User }],
    order: order ? [["total_price", order]] : [["id", "asc"]],
  });
  return orders;
};

const getAllOrders = async (req, res) => {
  const { userId, status, order } = req.query;
  try {
    let orders = await getAllOrdersDb(userId, status, order);
    orders
      ? res.status(200).send(orders)
      : res.status(404).send({ error: "Order Not Found" });
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
};

module.exports = { getAllOrders };
