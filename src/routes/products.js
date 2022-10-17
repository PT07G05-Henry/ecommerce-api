const { Router } = require("express");
const { Product, Category, Order, Comment, Op } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configura las funciones

const getProductsByName = async (name) => {
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
      through: {
        attributes: [],
      },
    },
  });
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
  let category = req.query.category;
  let products;
  try {
    if (name) {
      products = await getProductsByName(name);
      if (products.length === 0)
        return res.send("There are no matches in the DB").status(404);
      res.status(200).send(products);
    } else if (category) {
      products = await getAllProducts();
      products = products.filter((p) =>
        p.categories.find((c) => c.name === category)
      );
      if (products.length === 0)
        return res.send("There are no porducts with that category in the DB");
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

router.post("/", async function (req, res) {
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

router.put("/", async (req, res) => {
  const { id, name, price, description, stock, images } = req.body;
  try {
    await Product.update(
      {
        name: name,
        price: price,
        description: description,
        stock: stock,
        images: images,
      },
      {
        where: {
          id: id,
        },
      }
    );
    let productUpdate = await getDetailProduct(id);
    res.status(200);
    res.send(productUpdate);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body;
  try {
    await Product.destroy({
      where: {
        id: id,
      },
    });
    res.status(200);
    res.send("Product Removed Successfully");
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

module.exports = router;
