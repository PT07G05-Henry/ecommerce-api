const { Router } = require("express");
const { Category } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { createCategory } = require("./controllers/categories/createCategory");
const { deleteCategory } = require("./controllers/categories/deleteCategory");
const { getCategories } = require("./controllers/categories/getCategories");
const { updateCategory } = require("./controllers/categories/updateCategory");

// Middlewares
const { isAuthenticated } = require("./middlewares/auth");
const { isSuperAdmin } = require("./middlewares/superAdmin.js");
const { isAdmin } = require("./middlewares/admin");
const { isOwner } = require("./middlewares/owner");

const router = Router();

router.get("/", getCategories);

router.post("/", isAuthenticated, isSuperAdmin, createCategory);

router.put("/", isAuthenticated, isSuperAdmin, updateCategory);

router.delete("/", isAuthenticated, isSuperAdmin, deleteCategory);

router.all("*", async (req, res) => {
  res.redirect("/");
});

module.exports = router;
