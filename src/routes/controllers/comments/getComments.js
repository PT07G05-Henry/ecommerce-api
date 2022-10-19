const { Comment } = require("../../../db");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    if (comments.length === 0)
      return res.send("There are no comments loaded in the DB").status(404);
    res.status(200).send(comments);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getComments };
