const { User } = require("../../db");

const isAuthenticated = async (req, res, next) => {
  // verify if auth
  const { sid } = req.query;
  try {
    const userDb = await User.findOne({ where: { sid } });
    if (sid === userDb.dataValues.sid) {
      //console.log("userDb", userDb.dataValues);
      next();
    } else res.send("Error credential!");
  } catch (e) {
    console.log("error isAuth");
    res.status(403).send("You must be logged in");
  }
};

module.exports = { isAuthenticated };
