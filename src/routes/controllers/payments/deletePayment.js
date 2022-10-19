const { Payment } = require("../../../db");

const deletePayment = async (req, res) => {
  const { id } = req.body;
  try {
    await Payment.destroy({
      where: {
        id: id,
      },
    });
    res.status(200);
    res.send("Payment Removed Successfully");
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { deletePayment };
