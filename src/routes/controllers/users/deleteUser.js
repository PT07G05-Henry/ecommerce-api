const { User } = require("../../../db");

const deleteUser = async (req, res) => {
  // el usuario da de baja su cuenta
  const { email } = req.body;
  try {
    await User.destroy({
      where: {
        email: email,
      },
    });
    res.status(200);
    res.send("User Removed Successfully");
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { deleteUser };
