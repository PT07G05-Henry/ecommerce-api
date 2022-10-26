const { User } = require("../../../db");

const deleteUser = async (req, res) => {
  // el usuario da de baja su cuenta
  try {
    await User.destroy({
      where: {
        id: parseInt(req.query.id),
      },
    });
    res.status(200);
    res.send("User Removed Successfully");
  } catch (err) {
    console.log(req.body)
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { deleteUser };
