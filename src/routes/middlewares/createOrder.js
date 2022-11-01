const { Order, User, Product, Op } = require("../../db");
const url = require("url");
const createOrder = async (req, res, next) => {
  //falta escribir acá
  try {
    const { sid } = req.query;
    const products = req.body;
    const userDb = await User.findOne({ where: { sid } });
    const productsDb = await Product.findAll({
      where: { id: { [Op.in]: products.map((e) => e.productId) } },
    });
    //create order

    const totalPrice = productsDb
      .map((p, i) => p.dataValues.price * products[i].quantity)
      .reduce((total, item) => total + item)
      .toFixed(2);

    const order = await Order.create({
      status: "Pending",
      total_price: totalPrice,
    });
    // user - order relation
    await userDb.addOrder(order);

    const op = await order.addProducts(productsDb);

    products.forEach(
      async (p, i) => await op[i].update({ product_quantity: p.quantity })
    );

    const data = products.map((p, i) => {
      return {
        title: productsDb[i].dataValues.name,
        quantity: p.quantity,
        currency_id: "ARS",
        unit_price: productsDb[i].dataValues.price,
      };
    });

    req.body.mercadoData = data;
    req.id_order = order.dataValues.id;
    next();
  } catch (e) {
    console.log("createOrder error!");
    console.log(e.message);
    res.status(400).json({ error: e.message, message: "Cant create order" });
  }
};

module.exports = createOrder;
