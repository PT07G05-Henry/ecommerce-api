const { Router } = require("express");
const { getCartById } = require("./controllers/carts/getCartById");
const { postCartById } = require("./controllers/carts/postCartById");
const { putCartById } = require("./controllers/carts/putCartById");
const { deleteCartById } = require("./controllers/carts/deleteCartById");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Middlewares
const { isAuthenticated } = require("./middlewares/auth");
//const { isSuperAdmin } = require("./middlewares/superAdmin.js");
//const { isSuperAdminOrAdmin } = require("./middlewares/superAdminOrAdmin.js");
const { isAdmin } = require("./middlewares/admin");
//const { isOwner } = require("./middlewares/owner");

const router = Router();

router.get("/:userId", getCartById);

router.post("/", postCartById);

router.put("/", putCartById);

router.delete("/", deleteCartById);

// router.all("*", async (req, res) => {
//   res.redirect("/");
// });

module.exports = router;