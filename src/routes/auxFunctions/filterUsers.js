const { Product, Category, Order, Comment, Op, User, Rol } = require("../../db");

const filterUsers = async function (
  page,
  quantity,
  order = "id",
  typeOrder = "ASC",
  name
) {
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
  let usersPerPage = await User.findAndCountAll({
    limit: quantity,
    offset: (page - 1) * quantity,
    order: [[order ? order.toLowerCase() : "id", typeOrder.toUpperCase()]],
    distinct: true, // no eliminar esto, ya que la funcion findAndCountAll se descontrola
    include: [Comment, Order, Rol],
    where: name ? { name: { [Op.iLike]: `%${name}%` } } : {},
  });
  return usersPerPage;
};

module.exports = { filterUsers };
