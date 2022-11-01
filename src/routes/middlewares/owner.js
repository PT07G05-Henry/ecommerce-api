const { User, Users_rols, Comments, Order } = require("../../db");
const { isProductOwner } = require("../auxFunctions/productOwner");
const { isCommentOwner } = require("../auxFunctions/commentOwner");
const isOwner = async (req, res, next) => {
  // verify if the user is owner of what he want to update or delete
  const { sid } = req.query;
  const { itemType, itemId } = req.body;
  //console.log("sid", sid);
  try {
    const userDb = await User.findOne({ where: { sid } });
    const rolesUser = await userDb.getRols();
    const user_rol = await Users_rols.findOne({
      where: { userId: userDb.dataValues.id },
    });

    //console.log(rolesUser[0].dataValues);
    // verify if the user is superAdmin first
    if (rolesUser.find((r) => r.dataValues.type === "Superadmin")) {
      //console.log("Is superadmin!");
      next();
    } else {
      switch (itemType) {
        case "PRODUCT":
          console.log("product owner?");
          if (await isProductOwner(itemId, user_rol.dataValues.id)) {
            //console.log("is owner");
            return next();
          }
          break;
        case "COMMENT":
          console.log("comment owner?");
          if (await isCommentOwner(itemId, userDb.dataValues.id)) {
            console.log("is owner");
            return next();
          }
          break;

        default:
          break;
      }
      res
        .status(403)
        .json({ error: "permission", message: "You are not the owner" });
    }
  } catch (e) {
    console.log("error isOwner");
    res.status(403).send(e);
  }
};

module.exports = { isOwner };
