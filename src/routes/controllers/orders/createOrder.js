const { Order, User, Product, Op } = require("../../../db");
const axios = require("axios");
require("dotenv").config();
const { ACCESS_TOKEN_TEST_MP } = process.env;

const createOrder = async (req, res, next) => {
  //falta escribir acá
  try {
    const { payment_id } = req.query;

    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${payment_id}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN_TEST_MP}`,
        },
      }
    );

    const products = response.data.additional_info.items;
    const total_price = Number(response.data.transaction_amount);
    const { sid } = response.data.metadata;

    const userDb = await User.findOne({ where: { sid } });
    const productsDb = await Product.findAll({
      where: { id: { [Op.in]: products.map((e) => e.id) } },
    });

    // //create order
    if (response.data.status === "in_process") response.data.status = "PENDING";

    const order = await Order.create({
      //LUEGO CAMBIAR PARA VERIFICAR EL STATUS DE MP
      status: response.data.status,
      total_price,
    });
    // // user - order relation
    await userDb.addOrder(order);

    const op = await order.addProducts(productsDb);

    products.forEach(
      async (p, i) =>
        await op[i].update({ product_quantity: parseInt(p.quantity) })
    );

    const result = await Order.findOne({
      where: { id: order.dataValues.id },
      include: [User, Product],
    });

    req.query.responseMP = `https://localhost:3000/payment?userId=${userDb.dataValues.id}&orderId=${order.dataValues.id}&status=${response.data.status}&total_price=${total_price}`;
    const infoMail = {
      subject: `${payment_id} order`,
      type: "newBuyCart",
      message: `${result.user.dataValues.first_name} this are your products`,
      directionAddress: `Direction Address: ${userDb.dataValues.direction} - Between street 1: ${userDb.dataValues.street1} & street 2: ${userDb.dataValues.street2} - City: ${userDb.dataValues.city} - Postal Code: ${userDb.dataValues.postalCode}`,
      email: `${result.user.dataValues.email}`,
      totalPrice: `${result.dataValues.total_price}`,
      products: result.dataValues.products.map((p) => p.dataValues),
      orderId: order.dataValues.id
    };
    req.body.payment = {
      type: "",
      status: "",
    };

    req.body.order = order;
    req.body.orderStatus = order.dataValues.status;
    if (response.data.payment_type_id === "account_money")
      req.body.payment.type = "Mercado Pago";
    if (response.data.payment_type_id === "credit_card")
      req.body.payment.type = "Credit Card";
    if (response.data.payment_type_id === "debit_card")
      req.body.payment.type = "Debit";

    if (response.data.status === "PENDING") req.body.payment.status = "Pending";
    if (response.data.status === "approved")
      req.body.payment.status = "Complete";
    if (response.data.status === "rejected") req.body.payment.status = "Failed";
    req.body = { ...req.body, ...infoMail };
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message, message: "Cant create order" });
  }
};

module.exports = { createOrder };
