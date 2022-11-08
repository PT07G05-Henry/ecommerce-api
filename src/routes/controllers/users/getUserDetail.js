const { User } = require("../../../db");

const getUserDb = async (id) => {
  const userDb = await User.findByPk(id);
  return {
    ...userDb.dataValues,
    profile_picture: JSON.parse(userDb.dataValues.profile_picture).secure_url,
  };
};

const getUserDetail = async (req, res) => {
  const id = req.params.id;
  const user = await getUserDb(id);
  user
    ? res.status(200).send(user)
    : res.status(404).send({ error: "User Not Found" });
};

module.exports = { getUserDetail };
