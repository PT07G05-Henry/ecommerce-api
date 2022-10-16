const { Router } = require("express");
const { User, Order, Product, Rol, Comment } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configura las funciones

const getDetailUser = async (id) => {
    return await User.findByPk( id )
}

const getUsers = async () => {
    return User.findAll({
      include: [Order, Product, Rol, Comment]
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

router.get("/:id", async(req, res)=>{
    const id = req.params.id;
    const user = await getDetailUser(id);
    user
      ? res.status(200).send(user)
      : res.status(404).send({ error: "User Not Found" });
})

router.post("/", async function (req, res) {
    const { given_name, family_name, birth_date, email, sub, picture } = req.body;
    if (!given_name || !family_name || !birth_date || !email || !sub) {
      res.status(400);
      return res.send("Missing to send mandatory data");
    }
    try {
      let newUser = await User.create({
        first_name: given_name,
        last_name: family_name,
        birth_date,
        email,
        password: sub,
        profile_picture: picture
      });
      await newUser.setRols(req.body.rols);
      res.sendStatus(201);
    } catch (error) {
      res.status(400);
      res.send(error.message);
    }
  });

router.put("/", async (req, res) => {
  const { id, given_name, family_name, birth_date, email, sub } = req.body;
  try {
    await User.update({ 
      first_name: given_name,
      last_name: family_name,
      birth_date,
      email,
      password: sub,
    }, 
    {
      where: {
        id: id
      }
    });
  let userUpdate = await getDetailUser(id)
  res.status(200);
  res.send(userUpdate);
  } catch(err) {
    res.status(400);
    res.send(err.message);
  }
});

router.delete("/", async (req, res) => {
    //falta escribir acá
});

module.exports = router;