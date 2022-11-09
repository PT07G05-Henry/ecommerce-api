const { Comment } = require("../../../db");

const getCommentsById = async (id, relation) => {
  if (!relation) return Comment.findByPk(id);
  else if (relation.toLowerCase() === "product") {
    return Comment.findAll({
      where: {
        productId: id,
      },
    });
  } else if (relation.toLowerCase() === "user") {
    return Comment.findAll({
      where: {
        userId: id,
      },
    });
  }
};

const getCommentDetail = async (req, res) => {
  let { id } = req.params;
  let { relation } = req.query;
  console.log(relation, id);
  try {
    const comments = await getCommentsById(id, relation);
    if (comments.length === 0)
      return res.send("There are no matchs in the DB").status(404);
    res.status(200).send(comments);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getCommentDetail };
