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
      if (Array.isArray(req.files.images))
        for (const img of req.files.images) {
          const cloudinaryImg = await uploadImage(img.tempFilePath);
          newImages.push({
            secure_url: cloudinaryImg.secure_url,
            public_id: cloudinaryImg.public_id,
          });
          await fse.unlink(img.tempFilePath);
        }
      else {
        const cloudinaryImg = await uploadImage(req.files.images.tempFilePath);
        newImages.push({
          secure_url: cloudinaryImg.secure_url,
          public_id: cloudinaryImg.public_id,
        });
        await fse.unlink(req.files.images.tempFilePath);
      }
    }

    let newProduct = await Product.create({
      name,
      price: Number.parseFloat(price.replace(",", ".")).toFixed(2),
      description,
      stock: Number.parseInt(stock),
      images: newImages,
    });

    //categories.forEach((c) => Number.parseInt(c));
    const cat = categories.split(",").map((c) => Number.parseInt(c));
    await newProduct.setCategories(cat);

    await newProduct.update({ usersRolId: user_rol.dataValues.id });

    const result = await Product.findOne({
      where: { id: newProduct.dataValues.id },
      include: [Category, Users_rols],
    });

    res.set("Content-Type", "multipart/form-data");

    res.status(200).json({
      ...result.dataValues,
      images: [...JSON.parse(result.dataValues.images)].map((img) => {
        return { image: img.secure_url };
      }),
    });
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { createProduct };
