const { User, Rol } = require("./../db.js");

const setSuperAdmin = async (user) => {
  const superAdmin = await User.findOne({ where: { email: user.email } });
  //console.log(superAdmin);
  const result = await superAdmin.setRols(3);
};

module.exports = { setSuperAdmin };
