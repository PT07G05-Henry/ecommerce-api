const { Router } = require("express");
const { getProducts } = require("./controllers/products/getProducts");
const { getProductDetail } = require("./controllers/products/getProductDetail");
const { getAllProducts } = require("./controllers/products/getAllProducts");
const { createProduct } = require("./controllers/products/createProduct");
const { updateProduct } = require("./controllers/products/updateProduct");
const { deleteProduct } = require("./controllers/products/deleteProduct");

//Middlewares
const { isAuthenticated } = require("./middlewares/auth");
const { isAdmin } = require("./middlewares/admin");
const { isOwner } = require("./middlewares/owner");
const router = Router();

router.get("/all", getAllProducts);

router.get("/", getProducts);

router.get("/:id", getProductDetail);

router.post("/", isAuthenticated, isAdmin, createProduct);

router.put("/", isAuthenticated, isAdmin, updateProduct);

router.delete("/", isAuthenticated, isAdmin, deleteProduct);

module.exports = router;
