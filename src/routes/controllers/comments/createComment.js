const { Comment } = require("../../../db");

const createComment = async (req, res) => {
  const { value, userId, productId } = req.body;
  if (!value) return res.status(400).send("Missing to send mandatory data");
  try {
    let newComment = await Comment.create(req.body);
    await newComment.setProduct(productId);
    await newComment.setUser(userId);
    res.sendStatus(201);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { createComment };
