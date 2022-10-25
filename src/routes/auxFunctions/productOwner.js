const { Product, Users_rols } = require("../../db");

const isProductOwner = async (idProduct, idUserRol) => {
  console.log("idProduct", idProduct);
  console.log("idUser", idUserRol);
  try {
    const result = await Product.findOne({
      where: { id: Number.parseInt(idProduct), usersRolId: idUserRol },
    });

    if (result) {
      //console.log("is true");
      return true;
    }
    //console.log("is false");
    return false;
  } catch (e) {
    console.log(e);
    return e.message;
  }
};

module.exports = { isProductOwner };
