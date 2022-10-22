const { Router } = require("express");
const { createUser } = require("./controllers/users/createUser");
const { deleteUser } = require("./controllers/users/deleteUser");
const { getUserDetail } = require("./controllers/users/getUserDetail");
const { getUsers } = require("./controllers/users/getUsers");
const { auth0db } = require("./controllers/users/auth0db");
const { updateUser } = require("./controllers/users/updateUser");

const router = Router();

router.get("/", getUsers);

router.post("/auth0", auth0db);

router.get("/:id", getUserDetail);

router.post("/", createUser);

router.put("/", updateUser);

router.delete("/", deleteUser);

module.exports = router;
