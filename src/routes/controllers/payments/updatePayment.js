const { Payment } = require("../../../db");

const updatePayment = async (req, res) => {
  const { id, type, status } = req.body;
  try {
    await Payment.update(
      {
        type: type,
        status: status,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send("Payment uploaded successfully");
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { updatePayment };
