const { Router } = require("express");
const { createOrder } = require("./controllers/orders/createOrder");
const { deleteOrder } = require("./controllers/orders/deleteOrder");
const { getOrderDetail } = require("./controllers/orders/getOrderDetail");
const { getOrders } = require("./controllers/orders/getOrders");
const { updateOrder } = require("./controllers/orders/updateOrder");
const { getAllOrders } = require("./controllers/orders/getAllOrders");

//Middlewares
const { isAuthenticated } = require("./middlewares/auth");
const { isUser } = require("./middlewares/user");
const { isOwner } = require("./middlewares/owner");
const { isSuperAdmin } = require("./middlewares/superAdmin");

const router = Router();

// For admin or user dashboard
router.get("/", isAuthenticated, getOrders);

// Just for superadmin
router.get("/all", isAuthenticated, isSuperAdmin, getAllOrders);

router.get("/:id", isAuthenticated, getOrderDetail);

router.post("/", isAuthenticated, isUser, createOrder);

router.put("/", updateOrder);

router.delete("/", deleteOrder);

module.exports = router;
