const { User } = require("../../db");

const isAuthenticated = async (req, res, next) => {
  // verify if auth
  const { sid } = req.query;
  try {
    const userDb = await User.findOne({ where: { sid } });
    if (sid === userDb.dataValues.sid) {
      console.log("userDb", userDb.dataValues);
      next();
    } else console.log("redirect to login");
  } catch (e) {
    res.status(403).send("You must be logged in");
  }
};

const signUp = (req, res) => {
  //signUp
  //create user in db
};

const signIn = (req, res) => {
  //signIn
};

module.exports = { isAuthenticated, signUp, signIn };
