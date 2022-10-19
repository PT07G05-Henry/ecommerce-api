const { Product, Category, Order, Comment, Op } = require("../../db");

const filterProducts = async function (
  page,
  quantity,
  order = "id",
  typeOrder = "ASC",
  category,
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
  let productsPerPage = await Product.findAndCountAll({
    limit: quantity,
    offset: (page - 1) * quantity,
    order: [[order ? order.toLowerCase() : "id", typeOrder.toUpperCase()]],
    distinct: true, // no eliminar esto, ya que la funcion findAndCountAll se descontrola
    include: category
      ? [
          {
            model: Category,
            where: { id: category },
          },
          Comment,
          Order,
        ]
      : [Comment, Order, Category],
    where: name ? { name: { [Op.iLike]: `%${name}%` } } : {},
  });
  return productsPerPage;
};

module.exports = { filterProducts };
