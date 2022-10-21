const { User, Order, Product, Rol, Comment } = require("../../../db");

const getUsersDb = async () => {
  return User.findAll({
    include: [Order, Product, Rol, Comment],
  });
};

const getUsers1 = async (req, res) => {
  console.log(req.body)
  const email= req.body.email;
  const busqueda = await User.findAll(
    {
    where:{email},
    include: [Rol]
    })
    console.log(busqueda)
  if(busqueda.length === 0){
    const crear = await User.create({
      last_name:req.body.last_name,
      email: req.body.email,
      first_name: req.body.first_name,
      password: req.body.password,
      birth_date: req.body.birth_date,
      profile_picture: req.body.profile_picture,
    });

    await crear.setRols(2)
    const result = await User.findAll(
      {
        where:{email},
        include: [Rol]
    })
    return res.json(result)
  }
    

  res.status(200).json({hola:"hola"})
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
