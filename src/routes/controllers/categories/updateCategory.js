const { Category } = require("../../../db");

const updateCategory = async (req, res) => {
  const { name, image, id } = req.body;
  try {
    await Category.update(
      {
        name: name,
        image: image,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send("Category uploaded successfully");
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { updateCategory };
