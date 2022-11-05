const { User, Product, Op } = require("../../db");
const url = require("url");
const dataMercado = async (req, res, next) => {
  //falta escribir acá
  try {
    const { sid } = req.query;
    const { products, total_price } = req.body;
    const userDb = await User.findOne({ where: { sid } });
    const productsDb = await Product.findAll({
      where: { id: { [Op.in]: products.map((e) => e.id) } },
    });

    var total = 0;

    const productDb1 = productsDb.map((p) => p.dataValues);

    products.forEach((p) => {
      let product = productsDb.find((pDb) => pDb.dataValues.id === p.id);
      if (product) total += product.dataValues.price * p.quantity;
    });

    total = total.toFixed(2);

    //create order

    // const order = await Order.create({
    //   status: "Pending",
    //   //total_price,
    //   total_price: total,
    // });

    // // user - order relation
    // await userDb.addOrder(order);

    // const op = await order.addProducts(productsDb);
    // console.log(op);
    // products.forEach(
    //   async (p, i) =>
    //     await op[i].update({ product_quantity: parseInt(p.quantity) })
    // );

    req.body.mercadoData = products.map((p) => {
      return {
        id: p.id,
        title: productsDb.find((pDb) => pDb.id === p.id).dataValues.name,
        quantity: p.quantity,
        unit_price: productsDb.find((pDb) => pDb.id === p.id).dataValues.price,
        currency_id: "ARS",
      };
    });

    req.id_order = userDb.dataValues.id;
    //return res.json({ body: req.body, id_order: req.id_order });
    next();
  } catch (e) {
    console.log("createOrder error!");
    console.log(e.message);
    res.status(400).json({ error: e.message, message: "Cant create order" });
  }
};

module.exports = dataMercado;

/*
{
      "id": 1,
            "title": "nombre",
            "quantity": 2,
            "unit_price": 500,
            "currency_id": "ARS"
    }
*/
