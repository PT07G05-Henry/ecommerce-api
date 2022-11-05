const { User } = require("../../../db");
const { uploadImage } = require("../../auxFunctions/cloudinary.js");
const fse = require("fs-extra");

const createUser = async function (req, res) {
  // unicamente para registrar usuarios, no admins
  const { first_name, last_name, birth_date, email, password } = req.body;
  if (!first_name || !last_name || !birth_date || !email || !password) {
    res.status(400);
    return res.send("Missing to send mandatory data");
  }
  try {
    let newUser = await User.create({
      first_name,
      last_name,
      birth_date,
      email,
      password,
    });

    await newUser.setRols(1);

    if (req.files?.images) {
      const cloudinaryImg = await uploadImage(req.files.images.tempFilePath);
     
      await newUser.update({
        profile_picture: cloudinaryImg.secure_url,
          
        });
      await fse.unlink(req.files.images.tempFilePath);
    }
    res.sendStatus(201);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
};

module.exports = { createUser };
