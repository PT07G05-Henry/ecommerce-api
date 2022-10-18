const { Router } = require("express");
const { User, Order, Product, Rol, Comment } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configura las funciones

const getDetailUser = async (id) => {
  return await User.findByPk(id);
};

const getUsers = async () => {
  return User.findAll({
    include: [Order, Product, Rol, Comment],
  });
};

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  const email = req.query.email;
  let users = await getUsers();
  if (email) {
    let findUser = await users.filter((u) =>
      u.email.toLowerCase().includes(email.toLowerCase())
    );
    findUser.length
      ? res.status(200).send(findUser)
      : res.status(404).send("There are no matches in the DB");
  } else {
    if (users.length === 0)
      return res.send("There are no Users loaded in the DB");
    res.status(200).send(users);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getDetailUser(id);
  user
    ? res.status(200).send(user)
    : res.status(404).send({ error: "User Not Found" });
});

router.post("/", async function (req, res) {
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
});

router.put("/", async (req, res) => {
  // actualizacion de datos de usuarios
  const {
    id,
    first_name,
    last_name,
    birth_date,
    email,
    password,
    profile_picture,
  } = req.body;
  try {
    await User.update(
      {
        first_name,
        last_name,
        birth_date,
        email,
        password,
        profile_picture,
      },
      {
        where: {
          id: Number.parseInt(id),
        },
      }
    );
    let userUpdate = await getDetailUser(Number.parseInt(id));
    res.status(200);
    res.send(userUpdate);
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

router.delete("/", async (req, res) => {
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
});

module.exports = router;
