const { Router } = require("express");
const { createOrder } = require("./controllers/orders/createOrder");
const { deleteOrder } = require("./controllers/orders/deleteOrder");
const { getOrderDetail } = require("./controllers/orders/getOrderDetail");
const { getOrders } = require("./controllers/orders/getOrders");
const { updateOrder } = require("./controllers/orders/updateOrder");

//Middlewares
const { isAuthenticated } = require("./middlewares/auth");
const { isUser } = require("./middlewares/user");
const { isOwner } = require("./middlewares/owner");

const router = Router();

router.get("/", isAuthenticated, getOrders);

router.get("/:id", isAuthenticated, getOrderDetail);

router.post("/", isAuthenticated, isUser, createOrder);

router.put("/", updateOrder);

router.delete("/", deleteOrder);

module.exports = router;
