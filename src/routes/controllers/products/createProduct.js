const { Product, Category, Users_rols, User } = require("../../../db");

const createProduct = async function (req, res) {
  const { name, price, description, stock, images, categories } = req.body;
  const { sid } = req.query;

  if (!name || !price || !description || !stock) {
    res.status(400);
    return res.send("Missing to send mandatory data");
  }
  try {
    const userDb = await User.findOne({ where: { sid } });
    const user_rol = await Users_rols.findOne({
      where: { id: userDb.dataValues.id },
    });

    let newProduct = await Product.create({
      name,
      price: Number.parseFloat(price.replace(",", ".")).toFixed(2),
      description,
      stock: Number.parseInt(stock),
      images,
    });

    categories.forEach((c) => Number.parseInt(c));

    await newProduct.setCategories(categories);

    await newProduct.update({ usersRolId: user_rol.dataValues.id });

    const result = await Product.findOne({
      where: { id: newProduct.dataValues.id },
      include: [Category, Users_rols],
    });
    //console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { createProduct };
