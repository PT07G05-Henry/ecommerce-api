const { Router } = require("express");
const { Category } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configura las funciones

const getAllCategory = async () => {
  const categories = await Category.findAll();
  return categories;
};

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  try {
    let categories = await getAllCategory();
    if (categories.length === 0)
      return res.send("There are no categories loaded in the DB").status(404);
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  const { name, image } = req.body;
  if (!name || !image) {
    res.status(400);
    return res.send("Missing to send mandatory data");
  }
  try {
    await Category.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

router.put("/", async (req, res) => {
  const { name, image, id } = req.body;
  try {
    await Category.update(
      {
        name: name,
        image: image,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send("Category uploaded successfully");
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body;
  try {
    await Category.destroy({
      where: {
        id: id,
      },
    });
    res.status(200);
    res.send("Category removed succesfully");
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

router.all("*", async (req, res) => {
  res.redirect("/");
});

module.exports = router;
