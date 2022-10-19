const { filterProducts } = require("../../auxFunctions/filterProducts");
require("dotenv").config();
const { PORT } = process.env;
const getProducts = async (req, res) => {
  let {
    name,
    page = 1,
    quantity = 10,
    category,
    typeOrder,
    orderBy,
  } = req.query;

  try {
    let products = await filterProducts(
      page,
      quantity,
      orderBy,
      typeOrder,
      category,
      name
    );
    if (products.length === 0)
      return res.send("There are no products loaded in the DB");
    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const port = process.env.PORT || PORT;
    const query = req.query;

    const pagNext =
      Object.keys(query).length === 0
        ? `${protocol}://${host}:${port}${
            url.includes("?")
              ? url.concat("&page=2", "&quantity=" + Number(quantity))
              : url.concat("?page=2", "&quantity=" + Number(quantity))
          }`
        : url.includes("page=")
        ? `${protocol}://${host}:${port}${url.replace(
            /page=\d{1,}/g,
            `page=${Number(page) + 1}`
          )}`
        : `${protocol}://${host}:${port}${url.concat("&page=2")}`;

    const pagPrev = url.includes("page=")
      ? `${protocol}://${host}:${port}${url.replace(
          /page=\d{1,}/g,
          `page=${Number(page) - 1}`
        )}`
      : `${protocol}://${host}:${port}${url.concat(
          "&page=" + Number(page) - 1
        )}`;

    const obj = {
      totalProducts: products.count,
      next:
        Number(page) + 1 > Math.ceil(products.count / quantity) ? "" : pagNext,
      prev: Number(page) - 1 === 0 ? "" : pagPrev,
      totalPage: Math.ceil(products.count / quantity),
      page: page,
      quantity: quantity,
      query: {
        page,
        quantity,
        orderBy,
        typeOrder,
        category,
        name,
      },
      results: products.rows,
    };
    res.status(200).send(obj);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
};

module.exports = { getProducts };
