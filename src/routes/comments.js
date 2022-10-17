const { Router } = require("express");
const { Comment } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configura las funciones
const getCommentsById = async (id, relation) => {
  if (!relation) return Comment.findByPk(id);
  else if (relation.toLowerCase() === "product") {
    return Comment.findAll({
      where: {
        productId: id,
      },
    });
  } else if (relation.toLowerCase() === "user") {
    return Comment.findAll({
      where: {
        userId: id,
      },
    });
  }
};

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let { relation } = req.query;
  console.log(relation, id);
  try {
    comments = await getCommentsById(id, relation);
    if (comments.length === 0)
      return res.send("There are no matchs in the DB").status(404);
    res.status(200).send(comments);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll();
    if (comments.length === 0)
      return res.send("There are no comments loaded in the DB").status(404);
    res.status(200).send(comments);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  const { value, userId, productId } = req.body;
  if (!value) return res.status(400).send("Missing to send mandatory data");
  try {
    let newComment = await Comment.create(req.body);
    await newComment.setProduct(productId);
    await newComment.setUser(userId);
    res.sendStatus(201);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

router.put("/", async (req, res) => {
  const { id, value } = req.body;
  try {
    await Comment.update(
      { value },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send("Comment uploaded successfully");
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body;
  try {
    await Comment.destroy({
      where: {
        id: id,
      },
    });
    res.status(200);
    res.send("Comment removed succesfully");
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

module.exports = router;
