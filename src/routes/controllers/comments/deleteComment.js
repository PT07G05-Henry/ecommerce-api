const { Comment } = require("../../../db");

const deleteComment = async (req, res) => {
  const { id } = req.body;
  try {
    await Comment.destroy({
      where: {
        id: id,
      },
    });
    res.status(200);
    res.send("Comment removed succesfully");
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { deleteComment };
