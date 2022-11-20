const { Product, Orders_products } = require("../../db");

const updateStock = async (req, res, next) => {
const produ = await Orders_products.findAll({ where: { orderId: req.body.orderId } });
const myArray = produ?.map((p) => {return ({qty: p.dataValues.product_quantity, productId: p.dataValues.productId})});
myArray.forEach(async (p) => {
    const find = await Product.findByPk(p.productId)
    find.update({stock: find.dataValues.stock - p.qty})
})
 next();
};
module.exports = { updateStock };