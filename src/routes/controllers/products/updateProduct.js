const { getProduct } = require("./getProductDetail");
const fse = require("fs-extra");
const { uploadImage } = require("../../auxFunctions/cloudinary.js");

const updateProduct = async (req, res) => {
  const { id, name, price, description, stock, categories, available } =
    req.body;

  try {
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

    const productDb = await getProduct(id);

    await productDb.update({
      name,
      price: price && Number.parseFloat(price).toFixed(2), // convertir a float!!!
      description,
      stock: stock && Number.parseInt(stock),
      available,
    });

    if (categories && categories.length) {
      const cat = categories.split(",").map((c) => Number.parseInt(c));
      await productDb.setCategories(cat);
    }

    if (req.files?.images) {
      await productDb.update({
        images: newImages,
      });
    }

    let productUpdate = await getProduct(id);

    res.set("Content-Type", "multipart/form-data");

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
