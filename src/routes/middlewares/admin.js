const { User } = require("../../db");

const isAdmin = async (req, res, next) => {
  const { sid } = req.query;
  //console.log("sid", sid);
  try {
    const userDb = await User.findOne({ where: { sid } });
    const rolesUser = await userDb.getRols();
    // verify if the user is superAdmin first
    if (rolesUser.find((r) => r.dataValues.type === "Superadmin")) {
      //console.log("Is superadmin!");
      next();
    }
    //console.log(rolesUser);
    else if (rolesUser.find((r) => r.dataValues.type === "Admin")) {
      //console.log("Is admin!");
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
