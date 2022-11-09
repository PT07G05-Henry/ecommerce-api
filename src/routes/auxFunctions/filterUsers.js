const { Product, Category, Order, Comment, Op, User, Rol } = require("../../db");

const filterUsers = async function (
  page,
  quantity,
  order = "id",
  typeOrder = "ASC",
  name,
  rol = "All"
) {
  const deco = decodeURIComponent(name)
  const arr = deco.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const name2 = arr.join(" ");
  const pageAsNumber = Number.parseInt(page);
  const quantityAsNumber = Number.parseInt(quantity);

  let pag = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
    pag = pageAsNumber;
  }
  let quant = 10;
  if (
    !Number.isNaN(quantityAsNumber) &&
    quantityAsNumber > 0 &&
    quantityAsNumber < 20
  ) {
    quant = quantityAsNumber;
  }
  console.log(name2)
  let usersPerPage = await User.findAndCountAll({
    limit: quantity,
    offset: (page - 1) * quantity,
    order: [[order ? order.toLowerCase() : "id", typeOrder.toUpperCase()]],
    distinct: true, // no eliminar esto, ya que la funcion findAndCountAll se descontrola
    include: rol !=="All" ? [
      {
        model: Rol,
        where: {type: rol}
      }
    ] :[Comment, Order, Rol],
    where: name ? {[Op.or]: [
      { first_name: {[Op.iLike]: `%${name2.split(" ")[0]}%` }} ,
      { first_name: {[Op.iLike]: `%${name2.split(" ")[1]}%` }},
      { last_name: {[Op.iLike]: `%${name2.split(" ")[0]}%` }},
      { last_name: {[Op.iLike]: `%${name2.split(" ")[1]}%`} } 
    ]}  : {},
  });
  return usersPerPage;
};

module.exports = { filterUsers };
