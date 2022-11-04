const { User, Order, Product, Rol, Comment } = require("../../../db");

const getUsersDb = async (sid) => {
  if (sid)
    User.findOne({
      where: { sid },
      attributes: ["id"],
    });
  return User.findAll({
    include: [Order, Product, Rol, Comment],
    orderBy: [["id", "ASC"]],
  });
};

const getUsers = async (req, res) => {
  const { email, sid } = req.query;
  let users = await getUsersDb();
  if (email) {
    let findUser = await users.filter((u) =>
      u.email.toLowerCase().includes(email.toLowerCase())
    );
    findUser.length
      ? res.status(200).send(findUser)
      : res.status(404).send("There are no matches in the DB");
  } else {
    if (sid) {
      const user = await getUsersDb(sid);
      return res.json(user.dataValues);
    }
    if (users.length === 0)
      return res.send("There are no Users loaded in the DB");
    res.status(200).send(users);
  }
};

module.exports = { getUsers };
