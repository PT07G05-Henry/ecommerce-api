const { Delivery } = require("../../../db");

const getDeliveries = async (req, res) => {
  const deliveries = await Delivery.findAll();
  deliveries
    ? res.status(200).send(deliveries)
    : res.status(404).send({ error: "Delivery Not Found" });
};

module.exports = { getDeliveries };
