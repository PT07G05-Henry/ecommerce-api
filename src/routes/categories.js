const { Router } = require("express");
const { Category } = require("../db");
const { createCategory } = require("./controllers/categories/createCategory");
const { deleteCategory } = require("./controllers/categories/deleteCategory");
const { getCategories } = require("./controllers/categories/getCategories");
const { updateCategory } = require("./controllers/categories/updateCategory");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/", getCategories);

router.post("/", createCategory);

router.put("/", updateCategory);

router.delete("/", deleteCategory);

router.all("*", async (req, res) => {
  res.redirect("/");
});

module.exports = router;
