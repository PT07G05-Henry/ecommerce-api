const { User } = require("../../../db");

const deleteUser = async (req, res) => {
  // el usuario da de baja su cuenta
  const { id } = req.query;
  try {
    const userDb = await User.findOne({ where: { id } });
    //console.log("userDb", userDb);
    await User.destroy({
      where: {
        id: userDb.id,
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
