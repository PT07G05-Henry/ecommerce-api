const { Order, User, Product } = require("../../../db");
const createOrder = async (req, res) => {
  //falta escribir acá
  try {
    const { sid } = req.query;
    const { productId, quantity } = req.body;

    const userDb = await User.findOne({ where: { sid } });
    const product = await Product.findByPk(productId);

    //create order
    //console.log(product.price);
    const order = await Order.create({
      status: "Pending",
      total_price: product.dataValues.price,
    });
    // user - order relation
    await userDb.addOrder(order);

    const op = await order.addProducts(product);

    await op[0].update({ product_quantity: quantity });
    //console.log(result);
    const result = await Order.findOne({
      where: { id: order.dataValues.id },
      include: [User, Product],
    });
    console.log(result.dataValues);

    //res.status(200).json(result);
    res.redirect(
      url.format({
        pathname: "/mercado",
        body: result.dataValues,
      })
    );
  } catch (e) {
    console.log("createOrder error!");
    res.status(400).json({ error: e.message, message: "Cant create order" });
  }
};

module.exports = { createOrder };
