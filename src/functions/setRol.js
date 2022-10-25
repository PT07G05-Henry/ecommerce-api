const { User, Rol } = require("../db.js");

const setRol = async (user, rol) => {
  const userRol = await User.findOne({ where: { email: user.email } });
  //console.log(superAdmin);
  switch (rol) {
    case "SUPERADMIN":
      await userRol.addRols(1);
      await userRol.addRols(2);
      await userRol.addRols(3);
      return;
    case "ADMIN":
      await userRol.addRols(1);
      return;
    case "USER":
      await userRol.addRols(2);
      return;
  }
};

module.exports = { setRol };
