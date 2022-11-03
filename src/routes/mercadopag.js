const { Router } = require("express");
const {
  createLinkMP,
  notificacionorden,
} = require("./controllers/mercado/mercado.js");
const createOrder = require("./middlewares/createOrder.js");
const checkStock = require("./middlewares/checkStock.js");

const router = Router();

router.post("/pay", checkStock, (req, res) => {
  res.send("proceed to buy");
});
router.post("/", checkStock, createOrder, createLinkMP);
router.get("/notificacion", notificacionorden);

module.exports = router;
