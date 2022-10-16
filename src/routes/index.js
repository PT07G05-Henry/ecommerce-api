const { Router } = require("express");
const { Product, Category, User } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

let idUser = 1001;

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

router.get("/product/", async (req, res) => {
  const products = await Product.findAll();
  products
    ? res.status(200).send(products)
    : res.status(404).send({ error: "Product Not Found" });
});

router.get("/product/:id", async (req, res) => {
  let id = req.params.id;
  let product = await getDetailProduct(id);
  product
    ? res.status(200).send(product)
    : res.status(404).send({ error: "Product Not Found" });
});

router.post("/user", async (req, res)=>{
  const {first_name, last_name, birth_date, email, password, profile_picture} = req.body;
  try {
    const usuario = await User.create({
      id: idUser,
      first_name,
      last_name,
      birth_date,
      email,
      password,
      profile_picture,
    });
    idUser++;
    res.status(200).json(usuario)
  }catch(err){
    res.status(404).send({err: err, errorM: err.message})
  }

})

router.all("*", (req, res) => {
  res.redirect("/");
});
router;


module.exports = router;