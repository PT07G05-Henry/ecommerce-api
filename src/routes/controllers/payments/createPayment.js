const { Payment } = require("../../../db");

const createPayment = async (req, res) => {
  const { type, status } = req.body;
  if (!type || !status) {
    res.status(400);
    return res.send("Missing to send mandatory data");
  }
  try {
    let newPayment = await Payment.create(req.body);
    await newPayment.setOrder(req.body.order);
    res.sendStatus(201);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { createPayment };
