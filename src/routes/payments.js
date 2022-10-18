const { Router } = require("express");
const { Payment } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configura las funciones

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async(req, res)=>{
    try {
        const payments = await Payment.findAll();
    if (payments.length === 0) return res.send("There are no payments loaded on the DB");
    res.status(200).send(payments);
    } catch {
        res.status(500).send(err.message);
    }
});

router.post("/", async (req, res) => {
    const { type, status } = req.body;
  if (!type || !status) {
    res.status(400);
    return res.send("Missing to send mandatory data");
  }
  try {
    let newPayment = await Payment.create(req.body);
    await newPayment.setOrder(req.body.order);
    res.sendStatus(201);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

router.put("/", async (req, res) => {
    const { id, type, status} = req.body;
    try {
      await Payment.update(
        {
         type: type,
         status: status 
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).send("Payment uploaded successfully");
    } catch (err) {
      res.status(400);
      res.send(err.message);
    }
});

router.delete("/", async (req, res) => {
    const { id } = req.body;
    try {
      await Payment.destroy({
        where: {
          id: id,
        },
      });
      res.status(200);
      res.send("Payment Removed Successfully");
    } catch (err) {
      res.status(400);
      res.send(err.message);
    }
  });


module.exports = router;