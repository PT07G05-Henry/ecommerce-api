const { User } = require("../../../db");
const { uploadImage } = require("../../auxFunctions/cloudinary.js");
const fse = require("fs-extra");

const createUser = async function (req, res) {
  const { first_name, last_name, birth_date, email } = req.body;
  if (!first_name || !last_name || !birth_date || !email) {
    res.status(400);
    return res.send("Missing to send mandatory data");
  }
  try {
    let newUser = await User.create({
      first_name,
      last_name,
      birth_date,
      email,
    });

    await newUser.setRols(1);

    if (req.files?.images) {
      const cloudinaryImg = await uploadImage(req.files.images.tempFilePath);

      await newUser.update({
        profile_picture: {
          secure_url: cloudinaryImg.secure_url,
          public_id: cloudinaryImg.public_id,
        },
      });
      await fse.unlink(req.files.images.tempFilePath);
    }

    const result = await User.findByPk(newUser.dataValues.id);

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send(error.message);
  }
};

module.exports = { createUser };
