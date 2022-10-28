const { Router } = require("express");
const { createComment } = require("./controllers/comments/createComment");
const { deleteComment } = require("./controllers/comments/deleteComment");
const { getCommentDetail } = require("./controllers/comments/getCommentDetail");
const { getComments } = require("./controllers/comments/getComments");
const { updateComment } = require("./controllers/comments/updateComment");

//Middlewares
const { isAuthenticated } = require("./middlewares/auth");
const { isUser } = require("./middlewares/user");
const { isOwner } = require("./middlewares/owner");

const router = Router();

router.get("/:id", getCommentDetail);

router.get("/", getComments);

router.post("/", isAuthenticated, isUser, createComment);

router.put("/", isAuthenticated, isUser, isOwner, updateComment);

router.delete("/", isAuthenticated, isUser, isOwner, deleteComment);

module.exports = router;
