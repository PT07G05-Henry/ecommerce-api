const { Payment } = require("../../../db");

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    if (payments.length === 0)
      return res.send("There are no payments loaded on the DB");
    res.status(200).send(payments);
  } catch {
    res.status(500).send(err.message);
  }
};

module.exports = { getPayments };
