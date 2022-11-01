const { User } = require("../../../db");

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
    res.status(200);
    res.send('User updated succesfully');
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { updateUser };
