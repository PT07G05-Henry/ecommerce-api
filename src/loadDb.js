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
require("dotenv").config();
const { MOCKAPI, APIKEY } = process.env;

module.exports = async () => {
  console.log("LOADING DB...");
  try {
    const users = await axios.get(`${MOCKAPI}/user.json?key=${APIKEY}`);
    await users.data.forEach((u) => {
      User.upsert({
        id: u.id,
        first_name: u.first_name,
        last_name: u.last_name,
        birth_date: u.birth_date,
        email: u.email,
        password: u.password,
        profile_picture: u.profile_picture,
      });
    });
    const products = await axios.get(`${MOCKAPI}/product.json?key=${APIKEY}`);
    await products.data.forEach((p) => {
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
    const payments = await axios.get(`${MOCKAPI}/payment.json?key=${APIKEY}`);
    await payments.data.forEach((p) => {
      Payment.upsert({
        id: p.id,
        type: p.type,
        status: p.status,
      });
    });

    const orders = await axios.get(`${MOCKAPI}/order.json?key=${APIKEY}`);
    await orders.data.forEach((o) => {
      Order.upsert({
        id: o.id,
        total_price: o.total_price,
        status: o.status,
      });
    });

    const deliverys = await axios.get(`${MOCKAPI}/delivery.json?key=${APIKEY}`);
    await deliverys.data.forEach((d) => {
      Delivery.upsert({
        id: d.id,
        type: d.type,
        status: d.status,
        shipping_address: d.shipping_address,
        phone_number: d.phone_number,
      });
    });

    const comments = await axios.get(`${MOCKAPI}/comment.json?key=${APIKEY}`);
    await comments.data.forEach((c) => {
      Comment.upsert({
        id: c.id,
        value: c.value,
      });
    });

    const categories = await axios.get(
      `${MOCKAPI}/category.json?key=${APIKEY}`
    );
    await categories.data.forEach((c) => {
      Category.upsert({
        id: c.id,
        name: c.name,
        image: c.image,
      });
    });
    console.log("DB LOADED SUCCESSFULLY!");
    return;
  } catch (err) {
    console.log(err);
  }
};
