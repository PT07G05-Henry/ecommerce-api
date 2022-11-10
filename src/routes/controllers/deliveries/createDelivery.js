const { Delivery } = require("../../../db");

const createDelivery = async (req, res, next) => {
  //falta escribir acá
 var dire= req.body.directionAddress;
  try {
    let newDelivery = await Delivery.create({ type:"Standard Shipping", status:"Pre-admission", shipping_address: dire.replace("Direction Address: ",""), phone_number:"1135098899" });
    await newDelivery.setOrder(req.body.order);
    next();
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { createDelivery };
