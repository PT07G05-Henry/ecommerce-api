const { User } = require("../../../db");

const getUsersDb = async (sid) => {
  return User.findAll({
    where: {sid:sid},
    attributes: ['id']
  });
};
    
const getIdBySID = async (req, res) => {
  const sid = req.query.sid;
  let users = await getUsersDb(sid);
  if (sid) {
    res.status(200).send(users)
  } else {
    
    res.status(400).send("User not found");
  }
};

module.exports = { getIdBySID };