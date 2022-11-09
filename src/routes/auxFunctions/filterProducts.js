const {
  Product,
  Category,
  Order,
  Comment,
  Users_rols,
  Op,
} = require("../../db");

const filterProducts = async function (
  page,
  quantity,
  order = "id",
  typeOrder = "ASC",
  category,
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
  let productsPerPage = await Product.findAndCountAll({
    limit: quantity,
    offset: (page - 1) * quantity,
    order: [
      [
        order === "usersRolId" ? order : order ? order.toLowerCase() : "id",
        typeOrder.toUpperCase(),
      ],
    ],
    distinct: true, // no eliminar esto, ya que la funcion findAndCountAll se descontrola
    include: category
      ? [
          {
            model: Category,
            where: { id: category },
          },
          Comment,
          Order,
          {
            model: Users_rols,
            where: userId ? { userId: userId } : {},
          },
        ]
      : [
          Comment,
          Order,
          Category,
          {
            model: Users_rols,
            where: userId ? { userId: userId } : {},
          },
        ],
    where: name ? { name: { [Op.iLike]: `%${name}%` } } : {},
  });

  productsPerPage.rows = productsPerPage.rows.map((p) => {
    return {
      ...p.dataValues,
      images: [...JSON.parse(p.dataValues.images)].map((img) => {
        return { image: img.secure_url };
      }),
    };
  });

  return productsPerPage;
};

module.exports = { filterProducts };
