const { Router } = require("express");
const { Delivery } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configura las funciones


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async(req, res)=>{
    const deliveries = await Delivery.findAll();
    deliveries
      ? res.status(200).send(deliveries)
      : res.status(404).send({ error: "Delivery Not Found" });
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