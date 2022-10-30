const { Router } = require("express");
const { sendEmail } = require("./controllers/email/sendEmail")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Middlewares
const { isAuthenticated } = require("./middlewares/auth");
//const { isSuperAdmin } = require("./middlewares/superAdmin.js");
//const { isSuperAdminOrAdmin } = require("./middlewares/superAdminOrAdmin.js");
const { isAdmin } = require("./middlewares/admin");
//const { isOwner } = require("./middlewares/owner");

const router = Router();

router.post("/send", sendEmail);

router.all("*", async (req, res) => {
  res.redirect("/");
});

module.exports = router;