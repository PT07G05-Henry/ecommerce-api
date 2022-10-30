const { Order, User, Delivery, Product, Payment } = require("../../../db");

const getOrdersDb = async function (userDb, status, order) {
  const rolesUser = await userDb.getRols();
  if (rolesUser.find((r) => r.dataValues.type === "Admin")) {
    const ordersAdmin = await Order.findAll({
      attributes: ["id", "total_price", "status"],
      include: [
        {
          model: Product,
          where: { userId: userDb.id },
          attributes: ["id", "name"],
        },
        {
          model: Delivery,
        },
        {
          model: Payment,
        },
        {
          model: User,
        },
      ],
    });
    //console.log(ordersAdmin.dataValues);
    return ordersAdmin;
  } else if (rolesUser.find((r) => r.dataValues.type === "User")) {
    const ordersUser = await Order.findAll({
      attributes: ["id", "total_price", "status"],
      where: { userId: userDb.dataValues.id },
      include: [
        {
          model: Product,
          attributes: ["id", "name"],
        },
        {
          model: Delivery,
        },
        {
          model: Payment,
        },
      ],
    });

    //console.log(ordersUser);
    return ordersUser;
  }
};

const getOrders = async (req, res) => {
  const { sid, status, order } = req.query;
  try {
    console.log("get orders");
    const userDb = await User.findOne({ where: { sid } });
    const orders = await getOrdersDb(userDb, status, order);
    orders.length
      ? res.status(200).send(orders)
      : res.status(404).send({ error: "No order for this user" });
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
};

module.exports = { getOrders };
