const { Router } = require("express");
const { Payment } = require("../db");
const { createPayment } = require("./controllers/payments/createPayment");
const { deletePayment } = require("./controllers/payments/deletePayment");
const { getPayments } = require("./controllers/payments/getPayments");
const { updatePayment } = require("./controllers/payments/updatePayment");

const router = Router();

router.get("/", getPayments);

router.post("/", createPayment);

router.put("/", updatePayment);

router.delete("/", deletePayment);

module.exports = router;
