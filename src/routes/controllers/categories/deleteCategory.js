const { Category } = require("../../../db");

const deleteCategory = async (req, res) => {
  const { id } = req.body;
  try {
    await Category.destroy({
      where: {
        id: id,
      },
    });
    res.status(200);
    res.send("Category removed succesfully");
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { deleteCategory };
