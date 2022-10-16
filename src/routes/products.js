const { Router } = require("express");
const { Product, Category, Order, Comment } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configura las funciones

const getProductsByFilter = async (name) => {
    let products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [Comment, Category],
    });
    return products;
  };

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
};

const getAllProducts = async function () {
    let products = await Product.findAll({
      include: [Order, Comment, Category],
    });
    return products;
};

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
    let name = req.query.name;
    let products;
    try {
      if (name) {
        products = await getProductsByFilter(name);
        if (products.length === 0)
          return res.send("There are no matches in the DB").status(404);
        res.status(200).send(products);
      } else {
        products = await getAllProducts();
        if (products.length === 0)
          return res.send("There are no products loaded in the DB");
        res.status(200).send(products);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
});
  
router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let product = await getDetailProduct(id);
    product
      ? res.status(200).send(product)
      : res.status(404).send({ error: "Product Not Found" });
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