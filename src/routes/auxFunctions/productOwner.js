const { Product, Users_rols } = require("../../db");

const isProductOwner = async (idProduct, idUser) => {
  console.log("idProduct", idProduct);
  console.log("idUser", idUser);
  try {
    const result = await Product.findAll({
      where: { id: idProduct },
      include: [Users_rols],
    });

    console.log(result.dataValues.users_rols);
    if (result) {
      console.log("is true");
      return true;
    }
    console.log("is false");
    return false;
  } catch (e) {
    console.log(e);
    return e.message;
  }
};

module.exports = { isProductOwner };
