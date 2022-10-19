const { Category } = require("../../../db");

const createCategory = async (req, res) => {
  const { name, image } = req.body;
  if (!name || !image) {
    res.status(400);
    return res.send("Missing to send mandatory data");
  }
  try {
    await Category.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { createCategory };
