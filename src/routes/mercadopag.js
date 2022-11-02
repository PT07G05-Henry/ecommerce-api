const { Router } = require("express");
const { createLinkMP, notificacionorden } = require("./controllers/mercado/mercado.js");
const createOrder = require("./middlewares/createOrder.js");

const router = Router();


router.post("/", createOrder, createLinkMP);
router.get("/notificacion", notificacionorden);




module.exports = router;