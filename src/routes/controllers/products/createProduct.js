const { Product, Category, Users_rols, User } = require("../../../db");
const { uploadImage } = require("../../auxFunctions/cloudinary");
const fse = require("fs-extra");
const createProduct = async function (req, res) {
  const { name, price, description, stock, categories } = req.body;
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

    const newImages = [];
    if (req.files?.images) {
      for (const img of req.files.images) {
        const cloudinaryImg = await uploadImage(img.tempFilePath);
        newImages.push({
          secure_url: cloudinaryImg.secure_url,
          public_id: cloudinaryImg.public_id,
        });
        await fse.unlink(img.tempFilePath);
      }
    }

    let newProduct = await Product.create({
      name,
      price: Number.parseFloat(price.replace(",", ".")).toFixed(2),
      description,
      stock: Number.parseInt(stock),
      images: newImages,
    });

    categories.forEach((c) => Number.parseInt(c));

    await newProduct.setCategories(categories);

    await newProduct.update({ usersRolId: user_rol.dataValues.id });

    const result = await Product.findOne({
      where: { id: newProduct.dataValues.id },
      include: [Category, Users_rols],
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { createProduct };
