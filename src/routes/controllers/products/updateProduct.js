const { Product } = require("../../../db");
const { getProduct } = require("./getProductDetail");
const fse = require("fs-extra");
const { uploadImage } = require("../../auxFunctions/cloudinary.js");

const updateProduct = async (req, res, next) => {
  const { id, name, price, description, stock } = req.body;

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

    await Product.update(
      {
        name,
        price: price && Number.parseFloat(price).toFixed(2), // convertir a float!!!
        description,
        stock: stock && Number.parseInt(stock),
      },
      {
        where: {
          id: Number.parseInt(id),
        },
      }
    );

    if (req.files?.images) {
      await Product.update(
        {
          images: newImages,
        },
        {
          where: {
            id: Number.parseInt(id),
          },
        }
      );
    }

    let productUpdate = await getProduct(id);
    res.status(200);
    res.send(productUpdate);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send(err.message);
  }
};
module.exports = { updateProduct };
