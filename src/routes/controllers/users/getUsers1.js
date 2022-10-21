const { User, Order, Product, Rol, Comment } = require("../../../db");

const getUsersDb = async () => {
  return User.findAll({
    include: [Order, Product, Rol, Comment],
  });
};

const getUsers1 = async (req, res) => {
  // console.log(req.body);

  const { first_name, last_name, picture_profile, email, email_verified } =
    req.body;

  try {
    const userDb = await User.findOne({
      where: { email },
      include: [Rol],
    });
    if (userDb && userDb.dataValues) {
      return res.status(200).json({
        userDb: {
          first_name: userDb.dataValues.first_name,
          last_name: userDb.dataValues.last_name,
          email: userDb.dataValues.email,
        },
        roles: userDb.dataValues.rols.map((r) => r.type),
      });
    } else {
      const newUser = await User.create({
        first_name,
        last_name,
        email,
        picture_profile,
      });
      await newUser.setRols(1); // user role on first time
      const newUserWithRole = await User.findOne({
        where: { email: newUser.dataValues.email },
        include: [Rol],
      });
      return res.status(200).json({
        newUser: newUser.dataValues,
        roles: newUserWithRole.dataValues.rols.map((r) => r.type),
      });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e);
  }
  // const busqueda = await User.findAll(
  //   {
  //   where:{email},
  //   include: [Rol]
  //   })
  //   console.log(busqueda)
  // if(busqueda.length === 0){
  //   const crear = await User.create({
  //     last_name:req.body.last_name,
  //     email: req.body.email,
  //     first_name: req.body.first_name,
  //     password: req.body.password,
  //     birth_date: req.body.birth_date,
  //     profile_picture: req.body.profile_picture,
  //   });

  //   await crear.setRols(2)
  //   const result = await User.findAll(
  //     {
  //       where:{email},
  //       include: [Rol]
  //   })
  //   return res.json(result)
  // }

  res.status(200).json({ hola: "hola" });
  // const email = req.body.email;
  // let users = await getUsersDb();
  // if (email) {
  //   let findUser = await users.filter((u) =>
  //     u.email.toLowerCase().includes(email.toLowerCase())
  //   );
  //   findUser.length
  //     ? res.status(200).send(findUser)
  //     : res.status(404).send("There are no matches in the DB");
  // } else {
  //   if (users.length === 0)
  //     return res.send("There are no Users loaded in the DB");
  //   res.status(200).send(users);
  // }
};

module.exports = { getUsers1 };
