const { Order, User, Product, Op } = require("../../db");
const url = require("url");
const createOrder = async (req, res, next) => {
  //falta escribir acá
  try {
    const { sid } = req.query;
    const { products, total_price } = req.body;
    const userDb = await User.findOne({ where: { sid } });
    const productsDb = await Product.findAll({
      where: { id: { [Op.in]: products.map((e) => e.id) } },
    });
    //create order

    const order = await Order.create({
      status: "Pending",
      total_price,
    });
    // user - order relation
    await userDb.addOrder(order);

    const op = await order.addProducts(productsDb);
    console.log(op);
    products.forEach(
      async (p, i) =>
        await op[i].update({ product_quantity: parseInt(p.quantity) })
    );

    req.body.mercadoData = products;
    req.id_order = order.dataValues.id;
    next();
  } catch (e) {
    console.log("createOrder error!");
    console.log(e.message);
    res.status(400).json({ error: e.message, message: "Cant create order" });
  }
};

module.exports = createOrder;
