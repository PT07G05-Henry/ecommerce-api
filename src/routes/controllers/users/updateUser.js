const { Usert } = require("../../../db");

const updateUser = async (req, res) => {
  // actualizacion de datos de usuarios
  const {
    id,
    first_name,
    last_name,
    birth_date,
    email,
    password,
    profile_picture,
  } = req.body;
  try {
    await User.update(
      {
        first_name,
        last_name,
        birth_date,
        email,
        password,
        profile_picture,
      },
      {
        where: {
          id: Number.parseInt(id),
        },
      }
    );
    let userUpdate = await getDetailUser(Number.parseInt(id));
    res.status(200);
    res.send(userUpdate);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { updateUser };
