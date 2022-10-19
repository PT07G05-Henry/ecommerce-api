const { Router } = require("express");
const { createOrder } = require("./controllers/orders/createOrder");
const { deleteOrder } = require("./controllers/orders/deleteOrder");
const { getOrderDetail } = require("./controllers/orders/getOrderDetail");
const { getOrders } = require("./controllers/orders/getOrders");
const { updateOrder } = require("./controllers/orders/updateOrder");

const router = Router();

router.get("/", getOrders);

router.get("/:id", getOrderDetail);

router.post("/", createOrder);

router.put("/", updateOrder);

router.delete("/", deleteOrder);

module.exports = router;
