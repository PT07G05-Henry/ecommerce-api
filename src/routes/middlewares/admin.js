const { User } = require("../../db");

const isAdmin = async (req, res, next) => {
  // verify if the user is admin
  const { sid } = req.query;
  //console.log("sid", sid);
  try {
    const userDb = await User.findOne({ where: { sid } });
    const rolesUser = await userDb.getRols();
    //console.log(rolesUser);
    if (rolesUser.find((r) => r.dataValues.type === "Admin")) {
      //console.log("Is superadmin!");
      next();
    } else
      res
        .status(403)
        .json({ error: "permission", message: "You are not admin" });
  } catch (e) {
    console.log("error isAdmin");
    res.status(403).send(e);
  }
};

module.exports = { isAdmin };
