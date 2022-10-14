const { Router } = require("express");
const {User, Product, Payment, Delivery, Categories, Products_Categories, Order_Products, Order} = require("../db")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const consulproduct = async () => {
  return await Product.findAll({
      include: {
          model: Products_Categories,
          attributes: ["category_ID"],
        through: {
              attributes: [],
          }, 
      }
  })

} 


router.get("/test", async (req, res) => {
  res.status(200).send({ hi: "Hello world!!!" })
});

router.all("*", (req, res) => {
  res.redirect("/");
});

router.get('/home', async(req, res) => {
  const product_name  = req.query.productname
  let articulo = await consulproduct();
  
 
  if (product_name) {

      let buscararticulo = await articulo.filter(e => e.product_name.toLowerCase().includes(product_name.toLowerCase()))
      buscararticulo.length ? res.status(200).send(buscararticulo) : res.status(404).send("No existe articulo")
  }
  
  else {
      return res.status(200).send(buscararticulo)


  }

   })   

router;



module.exports = router;