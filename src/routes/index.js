const { Router } = require("express");
const { Product, Category } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getDetailProduct = async (id) => {
  return await Product.findByPk( id ,{
    include: {
      model: Category,
      attributes: ["name"],
      through: {
        attributes: [],
      }, 
    }
  })
}

router.get("/test", async (req, res) => {
  res.status(200).send({ hi: "Hello world!!!" })
});

router.get("/product/:id", async (req, res) => {
  let id = req.params.id;
  let product = await getDetailProduct(id);
  product
    ? res.status(200).send(product)
    : res.status(404).send({ error: "Product Not Found" });
});

router.all("*", (req, res) => {
  res.redirect("/");
});


module.exports = router;