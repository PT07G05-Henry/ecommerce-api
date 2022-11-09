const {
  Product,
  Category,
  Order,
  Delivery,
  User,
  Payment,
  Users_rols,
  Op,
} = require("../../db");

const filterOrders = async function (
  page,
  quantity,
  order = "id",
  typeOrder = "ASC",
  name,
  userId
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
  let ordersPerPage = await Order.findAndCountAll({
    limit: quantity,
    offset: (page - 1) * quantity,
    order: [
      [
        order === "usersRolId" ? order : order ? order.toLowerCase() : "id",
        typeOrder.toUpperCase(),
      ],
    ],
    distinct: true, // no eliminar esto, ya que la funcion findAndCountAll se descontrola
    include: [
          User,
          Delivery,
          Payment,
          {
            model: User,
            where: name ? { name: name } : {},
          },
        ],
  });

  ordersPerPage.rows = ordersPerPage.rows.map((p) => {
    return {
      ...p.dataValues
    };
  });

  return ordersPerPage;
};

module.exports = { filterOrders };
