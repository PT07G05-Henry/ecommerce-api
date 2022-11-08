const { Order, User, Delivery, Product, Payment } = require("../../../db");

const updateOrder = async (req, res) => {
    const orderId = req.query.id;
    const status = req.body.status;
    try {
        await Order.update({ status: status }, {
            where: {
                id: orderId
            }
        });
        res.status(200);
        res.send("Ok");
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
};

module.exports = { updateOrder };
