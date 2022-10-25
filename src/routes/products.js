const { Router } = require("express");
const { getProducts } = require("./controllers/products/getProducts");
const { getProductDetail } = require("./controllers/products/getProductDetail");
const { createProduct } = require("./controllers/products/createProduct");
const { updateProduct } = require("./controllers/products/updateProduct");
const { deleteProduct } = require("./controllers/products/deleteProduct");

//Middlewares
const { isAuthenticated } = require("./middlewares/auth");
const { isAdmin } = require("./middlewares/admin");

const router = Router();

router.get("/:id", getProductDetail);

router.get("/", getProducts);

router.post("/", isAuthenticated, isAdmin, createProduct);

router.put("/", updateProduct);

router.delete("/", deleteProduct);

module.exports = router;
