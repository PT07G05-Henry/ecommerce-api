const axios = require("axios");
const {
  User,
  Product,
  Payment,
  Order,
  Delivery,
  Comment,
  Category,
  Rol,
  Orders_products,
  Users_rols,
} = require("./db.js");

const createHash = require("./functions/createHash");

const categories = require("./filesJson/categories.json");
const comments = require("./filesJson/comments.json");
const deliveries = require("./filesJson/deliveries.json");
const orders = require("./filesJson/orders.json");
const payments = require("./filesJson/payments.json");
const products = require("./filesJson/products.json");
const users = require("./filesJson/users.json");
const roles = require("./filesJson/roles.json");
const { setRol } = require("./functions/setRol");

require("dotenv").config();
const { MOCKAPI, APIKEY } = process.env;

module.exports = async () => {
  console.log("LOADING DB...");
  try {
    async function fnUsers() {
      for (const u of users) {
        const user = await User.create(u);
        user.update({ sid: createHash(user.dataValues.email) });
      }
    }
    await fnUsers();

    async function fnCategories() {
      for (const c of categories) {
        await Category.create(c);
      }
    }
    await fnCategories();

    async function fnComments() {
      for (const c of comments) {
        await Comment.upsert(c);
      }
    }
    await fnComments();

    async function fnDeliveries() {
      for (const d of deliveries) {
        await Delivery.create(d);
      }
    }
    await fnDeliveries();

    async function fnOrders() {
      for (const o of orders) {
        await Order.create(o);
      }
    }
    await fnOrders();

    async function fnPayments() {
      for (const p of payments) {
        await Payment.create(p);
      }
    }
    await fnPayments();

    async function fnProducts() {
      for (const p of products) {
        await Product.create(p);
      }
    }
    await fnProducts();

    async function fnRols() {
      for (const r of roles) {
        await Rol.create(r);
      }
    }
    await fnRols();

    //Cargando Tablas Pivots

    //Productos
    const pr = await Product.findAll();

    function getRandom(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1));
    }

    const allCat = await Category.findAll();
    const allOrd = await Order.findAll();

    pr.forEach(async (p) => {
      await p.addCategory(await Category.findByPk(getRandom(1, allCat.length)));
      await p.addOrder(await Order.findByPk(getRandom(1, allOrd.length)));
    });

    // Usuarios - Roles
    /*linea 158-159 cambiar el numero del array dependiendo de la posicion
    de ADMIN ejemplo abajo en lineas comentadas*/
    await setRol(users[0], "SUPERADMIN"); // fede
    await setRol(users[1], "SUPERADMIN"); // chris
    await setRol(users[2], "ADMIN"); // julio linea 158-159 cambiar a [0]
    await setRol(users[3], "ADMIN"); // franco
    await setRol(users[4], "SUPERADMIN"); // ramiro
    await setRol(users[5], "ADMIN"); // matias linea 158-159 cambiar a [1]
    await setRol(users[6], "USER"); // tobias
    await setRol(users[7], "USER"); // jorge
    await setRol(users[8], "ADMIN"); // jorge2 linea 158-159 cambiar a [2]
    await setRol(users[9], "ADMIN"); // fede2 linea 158-159 cambiar a [3]

    const us = await User.findAll();
    us.forEach(async (u) => {
      if (u.id > 10) await u.addRol(await Rol.findByPk(getRandom(1, 2)));
    });

    //Comentarios
    const com = await Comment.findAll();
    com.forEach(async (c) => {
      await c.setUser(await User.findByPk(getRandom(1, us.length)));
      await c.setProduct(await Product.findByPk(getRandom(1, pr.length)));
    });

    // Order_products
    const order_pr = await Orders_products.findAll();
    order_pr.forEach(async (op) => {
      await op.update({ product_quantity: getRandom(1, 10) });
    });

    // Orders
    const ord = await Order.findAll();
    const pay = await Payment.findAll();
    const del = await Delivery.findAll();

    const users2 = await Users_rols.findAll({ where: { rolId: 2 } });
    //console.log(users2);
    ord.forEach(async (or) => {
      const random = getRandom(0, users2.length - 1);
      await or.update({
        userId: users2[random].dataValues.userId,
        paymentId: getRandom(1, pay.length),
        deliveryId: getRandom(1, del.length),
      });
    });

    // Owner products
    const admins = await Users_rols.findAll({ where: { rolId: 1 } });
    pr.forEach(async (p, i) => {
      if (i > 2 && i < 20) {
        await p.setUser(await admins[2].dataValues.userId);
        await p.setUsers_rol(await admins[2].dataValues.id);
        const arrayRatingProductId = await Comment.findAll({
          where: { productId: p.dataValues.id },
        });
        if (arrayRatingProductId.length > 0) {
          const arrayLength = arrayRatingProductId.length;
          const sumRatings = arrayRatingProductId.reduce((a, b) => {
            return a + b.dataValues.rating;
          }, 0);
          await p.update({ rating: Number.parseInt(sumRatings / arrayLength) });
        }
        return;
      }
      const random = getRandom(0, admins.length - 1);
      await p.setUser(await admins[random].dataValues.userId);
      await p.setUsers_rol(await admins[random].dataValues.id);
      const arrayRatingProductId = await Comment.findAll({
        where: { productId: p.dataValues.id },
      });
      if (arrayRatingProductId.length > 0) {
        const arrayLength = arrayRatingProductId.length;
        const sumRatings = arrayRatingProductId.reduce((a, b) => {
          return a + b.dataValues.rating;
        }, 0);

        await p.update({ rating: Number.parseInt(sumRatings / arrayLength) });
      }
    });

    console.log("DB LOADED SUCCESSFULLY!");
    return;
  } catch (err) {
    console.log("entro al catch de la carga de datos en la DB!");
    console.log(err);
  }
};
