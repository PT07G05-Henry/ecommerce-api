const { Product } = require("../../../db");
const { getProduct } = require("./getProductDetail");
const fse = require("fs-extra");
const { uploadImage } = require("../../auxFunctions/cloudinary.js");

const updateProduct = async (req, res) => {
  const { id, name, price, description, stock, categories } = req.body;

  try {
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

    const productDb = await getProduct(id);

    await productDb.update({
      name,
      price: price && Number.parseFloat(price).toFixed(2), // convertir a float!!!
      description,
      stock: stock && Number.parseInt(stock),
    });

    if (categories && categories.length)
      await productDb.setCategories(categories);

    if (req.files?.images) {
      await productDb.update({
        images: newImages,
      });
    }

    let productUpdate = await getProduct(id);
    res.status(200);
    res.json({
      ...productUpdate.dataValues,
      images: [...JSON.parse(productUpdate.dataValues.images)].map((img) => {
        return { image: img.secure_url };
      }),
    });
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send(err.message);
  }
};
module.exports = { updateProduct };
