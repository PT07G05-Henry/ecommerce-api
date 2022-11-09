const { Order, User, Delivery, Product, Payment, Op } = require("../../../db");

const getAllOrdersDb = async function (userId, status, order, name) {
  const deco = decodeURIComponent(name)
  const arr = deco.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const name2 = arr.join(" ");
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
          {
            model: Delivery,
          },
          {
            model: Payment,
          },
        ]
      : name
      ? [
          { model: User, where:  {[Op.or]: [
            { first_name: {[Op.iLike]: `%${name2.split(" ")[0]}%` }} ,
            { first_name: {[Op.iLike]: `%${name2.split(" ")[1]}%` }},
            { last_name: {[Op.iLike]: `%${name2.split(" ")[0]}%` }},
            { last_name: {[Op.iLike]: `%${name2.split(" ")[1]}%`} } 
          ]} 
        },
          {
            model: Delivery,
          },
          {
            model: Payment,
          },
        ]
      : [
          { model: User },
          {
            model: Delivery,
          },
          {
            model: Payment,
          },
        ],
    order: order ? [["total_price", order]] : [["id", "asc"]],
  });
  return orders;
};

const getAllOrders = async (req, res) => {
  const { userId, status, order, name } = req.query;
  try {
    let orders = await getAllOrdersDb(userId, status, order, name);
    orders
      ? res.status(200).send(orders)
      : res.status(404).send({ error: "Order Not Found" });
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
};

module.exports = { getAllOrders };
