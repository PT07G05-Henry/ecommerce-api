const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/test", async (req, res) => {
  res.status(200).send({ hi: "Hello world!!!" })
});

router.all("*", (req, res) => {
  res.redirect("/");
});

router;

module.exports = router;