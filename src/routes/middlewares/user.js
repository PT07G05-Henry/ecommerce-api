const { User } = require("../../db");

const isUser = async (req, res, next) => {
  // verify if the user has user role
  const { sid } = req.query;
  //console.log("sid", sid);
  try {
    const userDb = await User.findOne({ where: { sid } });
    const rolesUser = await userDb.getRols();
    //console.log(rolesUser);
    if (rolesUser.find((r) => r.dataValues.type === "User")) {
      //console.log("Is user!");
      next();
    } else
      res
        .status(403)
        .json({ error: "permission", message: "You are not user" });
  } catch (e) {
    console.log("error isUser");
    res.status(403).send(e);
  }
};

module.exports = { isUser };
