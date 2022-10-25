const { User, Users_rols, Comments, Order } = require("../../db");
const { isProductOwner } = require("../auxFunctions/productOwner");
const isOwner = async (req, res, next) => {
  // verify if the user is owner of what he want to update or delete
  const { sid } = req.query;
  const { id_item, item_type } = req.body;
  //console.log("sid", sid);
  try {
    const userDb = await User.findOne({ where: { sid } });
    const user_rol = await Users_rols.findOne({
      where: { id: userDb.dataValues.id },
    });

    //console.log(user_rol);
    switch (item_type) {
      case "PRODUCT":
        console.log("product owner?");
        if (await isProductOwner(id_item, user_rol.dataValues.id)) {
          console.log("is owner");
          return next();
        }
        break;
      case "COMMENT":
        console.log("comment owner?");
        break;

      case "ORDER":
        console.log("order owner?");
        break;
      default:
        break;
    }
    res
      .status(403)
      .json({ error: "permission", message: "You are not the owner" });
  } catch (e) {
    console.log("error isOwner");
    res.status(403).send(e);
  }
};

module.exports = { isOwner };
