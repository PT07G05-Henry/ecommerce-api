const { Router } = require("express");
const { Delivery } = require("../db");
const { createDelivery } = require("./controllers/deliveries/createDelivery");
const { deleteDelivery } = require("./controllers/deliveries/deleteDelivery");
const { getDeliveries } = require("./controllers/deliveries/getDeliveries");
const { updateDelivery } = require("./controllers/deliveries/updateDelivery");

const router = Router();

router.get("/", getDeliveries);

router.post("/", createDelivery);

router.put("/", updateDelivery);

router.delete("/", deleteDelivery);

module.exports = router;
