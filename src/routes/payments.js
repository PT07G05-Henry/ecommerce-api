const { Router } = require("express");
const { Payment } = require("../db");
const { createPayment } = require("./controllers/payments/createPayment");
const { deletePayment } = require("./controllers/payments/deletePayment");
const { getPayments } = require("./controllers/payments/getPayments");
const { updatePayment } = require("./controllers/payments/updatePayment");

//Middlewares
const { isAuthenticated } = require("./middlewares/auth");
const { isAdmin } = require("./middlewares/admin");

const router = Router();

router.get("/", isAuthenticated, isAdmin, getPayments);

// create payment tiene un next()
router.post("/", isAuthenticated, isAdmin, createPayment, (req, res) => {
  try {
    res.send(req.body.payment);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

router.put("/", isAuthenticated, isAdmin, updatePayment);

router.delete("/", isAuthenticated, isAdmin, deletePayment);

module.exports = router;
