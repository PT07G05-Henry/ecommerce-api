const { Router } = require("express");
const { createComment } = require("./controllers/comments/createComment");
const { deleteComment } = require("./controllers/comments/deleteComment");
const { getCommentDetail } = require("./controllers/comments/getCommentDetail");
const { getComments } = require("./controllers/comments/getComments");
const { updateComment } = require("./controllers/comments/updateComment");

const router = Router();

router.get("/:id", getCommentDetail);

router.get("/", getComments);

router.post("/", createComment);

router.put("/", updateComment);

router.delete("/", deleteComment);

module.exports = router;
