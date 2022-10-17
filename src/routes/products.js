const { Router } = require("express");
const { Product, Category, Order, Comment, Op } = require("../db");
require("dotenv").config();
const { PORT } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configura las funciones

const getAllProducts2 = async function (
  page,
  quantity,
  order = "id",
  typeOrder = "ASC",
  category,
  name
) {
  const pageAsNumber = Number.parseInt(page);
  const quantityAsNumber = Number.parseInt(quantity);

  let pag = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
    pag = pageAsNumber;
  }
  let quant = 10;
  if (
    !Number.isNaN(quantityAsNumber) &&
    quantityAsNumber > 0 &&
    quantityAsNumber < 20
  ) {
    quant = quantityAsNumber;
  }
  let productsPerPage = await Product.findAndCountAll({
    limit: quantity,
    offset: (page - 1) * quantity,
    order: [[order ? order.toLowerCase() : "id", typeOrder.toUpperCase()]],
    distinct: true, // no eliminar esto, ya que la funcion findAndCountAll se descontrola
    include: category
      ? [
          {
            model: Category,
            where: { id: category },
          },
          Comment,
          Order,
        ]
      : [Comment, Order, Category],
    where: name ? { name: { [Op.iLike]: `%${name}%` } } : {},
  });
  return productsPerPage;
};

const getProductsByFilter = async (name) => {
  let products = await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: [Comment, Category, Order],
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

//se puede eliminar esta funcion la dejo x si quieren usarla a futuro
const getAllProducts = async function () {
  let products = await Product.findAll({
    include: [Order, Comment, Category],
  });
  return products;
};

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req, res) => {
  let {
    name,
    page = 1,
    quantity = 10,
    category,
    typeOrder,
    orderBy,
  } = req.query;

  try {
    let products = await getAllProducts2(
      page,
      quantity,
      orderBy,
      typeOrder,
      category,
      name
    );
    if (products.length === 0)
      return res.send("There are no products loaded in the DB");
    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const port = process.env.PORT || PORT;
    const query = req.query;

    const pagNext =
      Object.keys(query).length === 0
        ? `${protocol}://${host}:${port}${
            url.includes("?")
              ? url.concat("&page=2", "&quantity=" + Number(quantity))
              : url.concat("?page=2", "&quantity=" + Number(quantity))
          }`
        : url.includes("page=")
        ? `${protocol}://${host}:${port}${url.replace(
            /page=\d{1,}/g,
            `page=${Number(page) + 1}`
          )}`
        : `${protocol}://${host}:${port}${url.concat("&page=2")}`;

    const pagPrev = url.includes("page=")
      ? `${protocol}://${host}:${port}${url.replace(
          /page=\d{1,}/g,
          `page=${Number(page) - 1}`
        )}`
      : `${protocol}://${host}:${port}${url.concat(
          "&page=" + Number(page) - 1
        )}`;

    const obj = {
      totalProducts: products.count,
      next:
        Number(page) + 1 > Math.ceil(products.count / quantity) ? "" : pagNext,
      prev: Number(page) - 1 === 0 ? "" : pagPrev,
      totalPage: Math.ceil(products.count / quantity),
      page: page,
      quantity: quantity,
      results: products.rows,
    };
    res.status(200).send(obj);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
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
  const { name, price, description, stock, images, categories } = req.body;

  if (!name || !price || !description || !stock || !images.length) {
    res.status(400);
    return res.send("Missing to send mandatory data");
  }
  try {
    let newProduct = await Product.create({
      name,
      price: Number.parseFloat(price.replace(",", ".")).toFixed(2),
      description,
      stock: Number.parseInt(stock),
      images,
    });

    categories.forEach((c) => Number.parseInt(c));

    await newProduct.setCategories(categories);
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
