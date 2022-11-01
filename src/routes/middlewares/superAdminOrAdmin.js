const { User } = require("../../db");

const isSuperAdminOrAdmin = async (req, res, next) => {
  // verify if the user is superadmin or admin
  const { sid } = req.query;
  //console.log("sid", sid);
  try {
    const userDb = await User.findOne({ where: { sid } });
    const rolesUser = await userDb.getRols();
    if (rolesUser.find((r) => r.dataValues.type === "Superadmin" || r.dataValues.type ==="Admin")) {
      next();
    } else
      res
        .status(403)
        .json({ error: "permission", message: "You are not Superadmin or Admin" });
  } catch (e) {
    console.log("error isSuperAdminAndAdmin");
    res.status(403).send(e);
  }
};

module.exports = { isSuperAdminOrAdmin };
