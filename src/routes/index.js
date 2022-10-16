const { Router } = require("express");
const { User, Product, Category, Comment, Rol, Op } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

let idUser = 1001;

const getUsers = async () => {
  return User.findAll({
    include: Rol,
  });
};

const getProductsByFilter = async function (name) {
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
  return await Product.findByPk(id, {
    include: {
      model: Category,
      attributes: ["name"],
      through: {.
        attributes: [],
      },
    },
  });
};

const getAllProducts = async function () {
  let products = await Product.findAll({
    include: [Comment, Category],
  });
  return products;
};

router.get("/test", async (req, res) => {
  res.status(200).send({ hi: "Hello world!!!" });
});

router.get("/product", async (req, res) => {
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

router.get("/product/:id", async (req, res) => {
  let id = req.params.id;
  let product = await getDetailProduct(id);
  product
    ? res.status(200).send(product)
    : res.status(404).send({ error: "Product Not Found" });
});

router.post("/product", async function (req, res) {
  const { name, price, description, stock, images } = req.body;
  if (!name || !price || !description || !stock || !images) {
    res.status(400);
    return res.send("Missing to send mandatory data");
  }
  try {
    let newProduct = await Product.create(req.body);
    await newProduct.setCategories(req.body.categories);
    res.sendStatus(201);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

router.get("/user", async (req, res) => {
  const email = req.query.email;
  let users = await getUsers();
  if (email) {
    let findUser = await users.filter((u) =>
      u.email.toLowerCase().includes(email.toLowerCase())
    );
    findUser.length
      ? res.status(200).send(findUser)
      : res.status(404).send("There are no matches in the DB");
  } else {
    if (users.length === 0)
      return res.send("There are no Users loaded in the DB");
    res.status(200).send(users);
  }
});

router.post("/user", async function (req, res) {
  const { first_name, last_name, birth_date, email, password } = req.body;
  if (!first_name || !last_name || !birth_date || !email || !password) {
    res.status(400);
    return res.send("Missing to send mandatory data");
  }
  try {
    let newUser = await User.create(req.body);
    await newUser.setRols(req.body.rols);
    res.sendStatus(201);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});
  
router.all("*", (req, res) => {
  res.redirect("/");
});
router;

module.exports = router;
