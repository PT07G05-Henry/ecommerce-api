const { User, Rol } = require("./../db.js");

const setSuperAdmin = async (user) => {
  const superAdmin = await User.findOne({ where: { email: user.email } });
  //console.log(superAdmin);
  await superAdmin.addRols(1);
  await superAdmin.addRols(2);
  await superAdmin.addRols(3);
};

module.exports = { setSuperAdmin };
