const { Order, User, Product, Op } = require("../../db");
const url = require('url');
const createOrder = async (req, res, next) => {
  //falta escribir acá
  try {
    const { sid } = req.query;
    const { products, quantity , total_price} = req.body;
    //console.log("aca productos",products);
    const userDb = await User.findOne({ where: { sid } });
    const product = await Product.findAll({where:{id:{[Op.in]:products.map((e)=>e.id)}}}); //solo me trae 1 producto

    //create order
    //console.log(product.price);
    const order = await Order.create({
      status: "Pending",
      total_price: total_price,
    });
    // user - order relation
    await userDb.addOrder(order);

    const op = await order.addProducts(product);

    await op[0].update({ product_quantity: quantity }); // para solo 1 producto? y los demas ?
    //console.log(result);
    const result = await Order.findOne({
      where: { id: order.dataValues.id },
      include: [User, Product],
    });
    //console.log("result dataValues",result.dataValues);

    //res.status(200).json(result);
    req.id_order = order.dataValues.id
    next();
  } catch (e) {
    console.log("createOrder error!");
    console.log(e.message)
    res.status(400).json({ error: e.message, message: "Cant create order" });
  }
};

module.exports =  createOrder ;
