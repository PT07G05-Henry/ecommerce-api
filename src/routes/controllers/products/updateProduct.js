const { Product } = require("../../../db");
const { getProduct } = require("./getProductDetail");
const fse = require("fs-extra");
const { uploadImage } = require("../../auxFunctions/cloudinary.js");

const updateProduct = async (req, res) => {
  
  
  const { id, name, price, description, stock } = req.body;

    if (req.files?.images) {
    const cloudinaryImg = await uploadImage(req.files.images.tempFilePath);
    const image = {
        secure_url: cloudinaryImg.secure_url,
        public_id: cloudinaryImg.public_id,
      }
      await fse.unlink(req.files.images.tempFilePath);
      console.log(image)
    };
      
  
  
    try {
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
  
      let productUpdate = await getProduct(id);
      res.status(200);
      res.send(productUpdate);
    } catch (err) {
      res.status(400);
      res.send(err.message);
    }
  };
module.exports = { updateProduct };
