const { Category } = require("../../../db");

const getCategoriesDb = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getCategories = async (req, res) => {
  try {
    let categories = await getCategoriesDb();
    if (categories.length === 0)
      return res.send("There are no categories loaded in the DB").status(404);
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getCategories };
