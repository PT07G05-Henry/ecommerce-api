const { Router } = require("express");
const { Category } = require("../db");
const { createCategory } = require("./controllers/categories/createCategory");
const { deleteCategory } = require("./controllers/categories/deleteCategory");
const { getCategories } = require("./controllers/categories/getCategories");
const { updateCategory } = require("./controllers/categories/updateCategory");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Middlewares
const { isAuthenticated } = require("./middlewares/auth");
//const { isSuperAdmin } = require("./middlewares/superAdmin.js");
//const { isSuperAdminOrAdmin } = require("./middlewares/superAdminOrAdmin.js");
const { isAdmin } = require("./middlewares/admin");
//const { isOwner } = require("./middlewares/owner");

const router = Router();

router.get("/", getCategories);

router.post("/", isAuthenticated, isAdmin, createCategory);

router.put("/", isAuthenticated, isAdmin, updateCategory);

router.delete("/", isAuthenticated, isAdmin, deleteCategory);

router.all("*", async (req, res) => {
  res.redirect("/");
});

module.exports = router;
