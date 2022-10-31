const { Router } = require("express");
const { crearorden, notificacionorden } = require("./controllers/mercado/mercado.js");

const router = Router();


router.get("/", crearorden);
router.get("/notificacion", notificacionorden);




module.exports = router;