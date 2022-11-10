const { Payment } = require("../../../db");

const createPayment = async (req, res, next) => {
  const { type, status } = req.body.payment;

  if (!type || !status) {
    res.status(400);
    return res.send("Missing type or status payment");
  }
  try {
    let newPayment = await Payment.create({ type, status });
    await newPayment.setOrder(req.body.order);
    next();
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { createPayment };
