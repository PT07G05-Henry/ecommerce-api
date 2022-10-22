const { User } = require("../../db");

const isSuperAdmin = async (req, res, next) => {
  // verify if the user is superadmin
  const { sid } = req.query;
  //console.log("sid", sid);
  try {
    const userDb = await User.findOne({ where: { sid } });
    const rolesUser = await userDb.getRols();
    if (rolesUser.find((r) => r.dataValues.type === "Superadmin")) {
      //console.log("Is superadmin!");
      next();
    } else
      res
        .status(403)
        .json({ error: "permission", message: "You are not superAdmin" });
  } catch (e) {
    console.log("error isSuperAdmin");
    res.status(403).send(e);
  }
};

module.exports = { isSuperAdmin };
