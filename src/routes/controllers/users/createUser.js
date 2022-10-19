const { User } = require("../../../db");

const createUser = async function (req, res) {
  // unicamente para registrar usuarios, no admins
  const { first_name, last_name, birth_date, email, password } = req.body;
  if (!first_name || !last_name || !birth_date || !email || !password) {
    res.status(400);
    return res.send("Missing to send mandatory data");
  }
  try {
    let newUser = await User.create({
      first_name,
      last_name,
      birth_date,
      email,
      password,
    });

    await newUser.setRols(1);
    res.sendStatus(201);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
};

module.exports = { createUser };
