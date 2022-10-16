const axios = require("axios");
const {
  User,
  Product,
  Payment,
  Order,
  Delivery,
  Comment,
  Category,
} = require("./db.js");

const categories = require("./filesJson/categories.json");
const comments = require("./filesJson/comments.json");
const deliveries = require("./filesJson/deliveries.json");
const orders = require("./filesJson/orders.json");
const payments = require("./filesJson/payments.json");
const products = require("./filesJson/products.json");
const users = require("./filesJson/users.json");

require("dotenv").config();
const { MOCKAPI, APIKEY } = process.env;

module.exports = async () => {
  console.log("LOADING DB...111");
  try {
    // const users = await axios.get(`${MOCKAPI}/user.json?key=${APIKEY}`);
    // await users.data.forEach((u) => {
    //   User.upsert({
    //     id: u.id,
    //     first_name: u.first_name,
    //     last_name: u.last_name,
    //     birth_date: u.birth_date,
    //     email: u.email,
    //     password: u.password,
    //     profile_picture: u.profile_picture,
    //   });
    // });
    // const products = await axios.get(`${MOCKAPI}/product.json?key=${APIKEY}`);
    // await products.data.forEach((p) => {
    //   Product.upsert({
    //     id: p.id,
    //     name: p.name,
    //     price: p.price,
    //     description: p.description,
    //     stock: p.stock,
    //     images: p.images,
    //     rating: p.rating,
    //   });
    // });
    // const payments = await axios.get(`${MOCKAPI}/payment.json?key=${APIKEY}`);
    // await payments.data.forEach((p) => {
    //   Payment.upsert({
    //     id: p.id,
    //     type: p.type,
    //     status: p.status,
    //   });
    // });

    // const orders = await axios.get(`${MOCKAPI}/order.json?key=${APIKEY}`);
    // await orders.data.forEach((o) => {
    //   Order.upsert({
    //     id: o.id,
    //     total_price: o.total_price,
    //     status: o.status,
    //   });
    // });

    // const deliverys = await axios.get(`${MOCKAPI}/delivery.json?key=${APIKEY}`);
    // await deliverys.data.forEach((d) => {
    //   Delivery.upsert({
    //     id: d.id,
    //     type: d.type,
    //     status: d.status,
    //     shipping_address: d.shipping_address,
    //     phone_number: d.phone_number,
    //   });
    // });

    // const comments = await axios.get(`${MOCKAPI}/comment.json?key=${APIKEY}`);
    // await comments.data.forEach((c) => {
    //   Comment.upsert({
    //     id: c.id,
    //     value: c.value,
    //   });
    // });

    // const categories = await axios.get(
    //   `${MOCKAPI}/category.json?key=${APIKEY}`
    // );
    // await categories.data.forEach((c) => {
    //   Category.upsert({
    //     id: c.id,
    //     name: c.name,
    //     image: c.image,
    //   });
    // });
    
    users.forEach((u) => {
      User.upsert({
        first_name: u.first_name,
        last_name: u.last_name,
        birth_date: u.birth_date,
        email: u.email,
        password: u.password,
        profile_picture: u.profile_picture,
      });
    });

  categories.forEach((c) => {
    Category.upsert({
      id: c.id,
      name: c.name,
      image: c.image
    });
  });

    comments.forEach((c) => {
      Comment.upsert({
        id: c.id,
        value: c.value,
      });
    });

    deliveries.forEach((d) => {
      Delivery.upsert({
        id: d.id,
        type: d.type,
        status: d.status,
        shipping_address: d.shipping_address,
        phone_number: d.phone_number,
      });
    });

    orders.forEach((o) => {
      Order.upsert({
        id: o.id,
        total_price: o.total_price,
        status: o.status,
      });
    });

    payments.forEach((p) => {
      Payment.upsert({
        id: p.id,
        type: p.type,
        status: p.status,
      });
    });

    products.forEach((p) => {
      Product.upsert({
        id: p.id,
        name: p.name,
        price: p.price,
        description: p.description,
        stock: p.stock,
        images: p.images,
        rating: p.rating,
      });
    });



    console.log("DB LOADED SUCCESSFULLY!");
    return;
  } catch (err) {
    console.log("entro al catch de la carga de datos en la DB!");
    console.log(err);
  }
};
