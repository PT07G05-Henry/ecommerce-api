const { User } = require("../../../db");

const deleteUser = async (req, res) => {
  // el usuario da de baja su cuenta
  const { sid } = req.query;
  try {
    const userDb = await User.findOne({ where: { sid } });
    await User.destroy({
      where: {
        id: userDb.dataValues.id,
      },
    });
    res.status(200);
    res.json({ user_removed: userDb.dataValues });
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { deleteUser };
