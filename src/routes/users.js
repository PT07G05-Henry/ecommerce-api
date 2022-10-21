const { Router } = require("express");
const { createUser } = require("./controllers/users/createUser");
const { deleteUser } = require("./controllers/users/deleteUser");
const { getUserDetail } = require("./controllers/users/getUserDetail");
const { getUsers } = require("./controllers/users/getUsers");
const { getUsers1 } = require("./controllers/users/getUsers1");
const { updateUser } = require("./controllers/users/updateUser");

const router = Router();

router.get("/", getUsers);

router.post("/test", getUsers1);

router.get("/:id", getUserDetail);

router.post("/", createUser);

router.put("/", updateUser);

router.delete("/", deleteUser);

module.exports = router;
