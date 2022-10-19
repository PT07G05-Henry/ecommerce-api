const { Comment } = require("../../../db");

const updateComment = async (req, res) => {
  const { id, value } = req.body;
  try {
    await Comment.update(
      { value },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send("Comment uploaded successfully");
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { updateComment };
