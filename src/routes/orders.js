const { Router } = require("express");
const { Order } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configura las funciones


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async(req, res)=>{
    const orders = await Order.findAll();
    orders
      ? res.status(200).send(orders)
      : res.status(404).send({ error: "Order Not Found" });
});

router.post("/", async (req, res) => {
    //falta escribir acá
});

router.put("/", async (req, res) => {
    //falta escribir acá
});

router.delete("/", async (req, res) => {
    //falta escribir acá
});


module.exports = router;