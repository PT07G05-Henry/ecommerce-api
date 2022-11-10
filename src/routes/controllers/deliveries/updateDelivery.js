const { Delivery, Order } = require("../../../db");

const updateDelivery = async (req, res) => {
  //falta escribir acá
  const { id, type, status } = req.body;
  const orden = await Order.findByPk(id, {include:{model:Delivery}});
  console.log("orden", orden)
  try {
    await Delivery.update(
      {
        type: type,
        status: status,
      },
      {
        where: {
          id: orden.dataValues.deliveryId,
        },
      }
    );
    res.status(200).send("Delivery uploaded successfully");
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { updateDelivery };