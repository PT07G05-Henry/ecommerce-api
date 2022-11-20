const { Category } = require("../../../db");

const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    return res.send("Missing to send mandatory data");
  }
  try {
    await Category.create(req.body);
    res.status(200).send(await Category.findAll());
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { createCategory };
