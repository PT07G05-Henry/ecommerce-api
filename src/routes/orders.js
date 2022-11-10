const { Router } = require("express");
const { createOrder } = require("./controllers/orders/createOrder");
const { deleteOrder } = require("./controllers/orders/deleteOrder");
const { getOrderDetail } = require("./controllers/orders/getOrderDetail");
const { getOrders } = require("./controllers/orders/getOrders");
const { updateOrder } = require("./controllers/orders/updateOrder");
const { getAllOrders } = require("./controllers/orders/getAllOrders");
const { sendEmail } = require("./controllers/email/sendEmail");
const { createPayment } = require("./controllers/payments/createPayment");
const { createDelivery } = require("./controllers/deliveries/createDelivery");

//Middlewares
const { isAuthenticated } = require("./middlewares/auth");
const { isUser } = require("./middlewares/user");
const { isOwner } = require("./middlewares/owner");
const { isAdmin } = require("./middlewares/admin");
const dataMercado = require("./middlewares/dataMercado.js");
const checkStock = require("./middlewares/checkStock.js");
const { createLinkMP } = require("./middlewares/mercado.js");

const router = Router();

// Just for superadmin
router.get("/all", isAuthenticated, isAdmin, getAllOrders);

//router.get("/:id", isAuthenticated, getOrderDetail);

//router.post("/", isAuthenticated, isUser, createOrder);

router.post(
  "/",
  isAuthenticated,
  isUser,
  checkStock,
  dataMercado,
  createLinkMP
);

router.get("/mercadoResponse", createOrder, createPayment, createDelivery, sendEmail);

// For admin or user dashboard
router.get("/", isAuthenticated, getOrders);

router.get("/:id", isAuthenticated, getOrderDetail);

router.put("/", isAuthenticated, isAdmin, updateOrder);

router.delete("/", deleteOrder);

module.exports = router;
