const { Product, Op } = require("../../db");

const checkStock = async (req, res, next) => {
  try {
    const { products } = req.body;
    const productsDb = await Product.findAll({
      where: {
        id: { [Op.in]: products.map((e) => e.id) },
      },
    });

    const checkList = [];

    products.forEach((p) => {
      let productDb = productsDb.find((pDb) => pDb.dataValues.id === p.id);
      //console.log(productDb.dataValues);
      if (productDb.dataValues.stock < p.quantity)
        checkList.push({
          productId: productDb.dataValues.id,
          name: productDb.dataValues.name,
          message: "Stock not available. Order less or remove",
        });
    });
    if (checkList.length) return res.json(checkList);
    next();
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.message);
  }
};

module.exports = checkStock;
