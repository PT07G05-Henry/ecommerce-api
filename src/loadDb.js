const axios = require("axios");
const { User, Product } = require("./db.js");
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

    console.log("DB LOADED SUCCESSFULLY!");
    return;
  } catch (err) {
    console.log(err);
  }
};
