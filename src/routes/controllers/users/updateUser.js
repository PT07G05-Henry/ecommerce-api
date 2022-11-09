const { User } = require("../../../db");

const fse = require("fs-extra");
const { uploadImage } = require("../../auxFunctions/cloudinary.js");

const getDetailUser = async (id) => {
  return await User.findByPk(id);
};

const updateUser = async (req, res) => {
  // actualizacion de datos de usuarios
  const {
    id,
    first_name,
    last_name,
    birth_date,
    direction,
    street1,
    street2,
    city,
    postalCode,
  } = req.body;
  try {
    let newProfile_picture = {};
    if (req.files?.profile_picture) {
      const cloudinaryImg = await uploadImage(
        req.files.profile_picture.tempFilePath
      );
      newProfile_picture = {
        secure_url: cloudinaryImg.secure_url,
        public_id: cloudinaryImg.public_id,
      };
      await fse.unlink(req.files.profile_picture.tempFilePath);
    }

    await User.update(
      {
        first_name,
        last_name,
        birth_date,
        profile_picture: newProfile_picture,
        direction,
        street1,
        street2,
        city,
        postalCode,
      },
      {
        where: {
          id: Number.parseInt(id),
        },
      }
    );
    const result = await User.findByPk(Number.parseInt(id));
    res.set("Content-Type", "multipart/form-data");
    res.status(200);
    res.send({
      ...result.dataValues,
      profile_picture: JSON.parse(result.dataValues.profile_picture).secure_url,
    });
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { updateUser };
