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
  Users_rols
} = require("./db.js");

const categories = require("./filesJson/categories.json");
const comments = require("./filesJson/comments.json");
const deliveries = require("./filesJson/deliveries.json");
const orders = require("./filesJson/orders.json");
const payments = require("./filesJson/payments.json");
const products = require("./filesJson/products.json");
const users = require("./filesJson/users.json");
const rols = require("./filesJson/rol.json");

require("dotenv").config();
const { MOCKAPI, APIKEY } = process.env;

module.exports = async () => {
  console.log("LOADING DB...");
  try {
    
    async function fnUsers() {
      for (const u of users) {
        await User.upsert({
          id: u.id,
          first_name: u.first_name,
          last_name: u.last_name,
          birth_date: u.birth_date,
          email: u.email,
          password: u.password,
          profile_picture: u.profile_picture,
        });
      }
    }
    await fnUsers();
    
    async function fnCategories(){
      for(const c of categories){
        await Category.upsert({
          id: c.id,
          name: c.name,
          image: c.image
        });
      }
    }
    await fnCategories();

    async function fnComments(){
      for(const c of comments){
        await Comment.upsert({
          id: c.id,
          value: c.value,
        });
      }
    }
    await fnComments();

    async function fnDeliveries(){
      for(const d of deliveries){
        await Delivery.upsert({
          id: d.id,
          type: d.type,
          status: d.status,
          shipping_address: d.shipping_address,
          phone_number: d.phone_number,
        });
      }
    }
    await fnDeliveries();

    async function fnOrders(){
      for(const o of orders){
        await Order.upsert({
          id: o.id,
          total_price: o.total_price,
          status: o.status,
        });
      }
    }
    await fnOrders();

    async function fnPayments(){
      for (const p of payments){
        await Payment.upsert({
          id: p.id,
          type: p.type,
          status: p.status,
        });
      }
    }
    await fnPayments();

    async function fnProducts(){
      for(const p of products){
        await Product.upsert({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          stock: p.stock,
          images: p.images,
          rating: p.rating,
        });

      }
    }
    await fnProducts();

    async function fnRols(){
      for(const r of rols){
        await Rol.upsert({
          id: r.id,
          type: r.type
        })
      }
    }
    await fnRols();

    //Cargando Tablas Pivots
  
    //Productos
    const pr = await Product.findAll();

    function getRandom(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1));
    }


    pr.forEach(async(p)=>{
      await p.addCategory(await Category.findByPk(getRandom(1,10)));
      await p.addOrder(await Order.findByPk(getRandom(1,600) ));
    })
    
    

    // Usuarios
    const us = await User.findAll();
    us.forEach(async(u)=>{
      await u.addRol(await Rol.findByPk(getRandom(1,2)));
    })

    //Comentarios
    const com = await Comment.findAll();
    com.forEach(async(c)=>{
      await c.setUser(await User.findByPk(getRandom(1,1000)));
      await c.setProduct(await Product.findByPk(getRandom(1,1000)));
    })

    // Order_products fallido (falta arreglar)
    const order_pr = await Orders_products.findAll();
    order_pr.forEach(async(op)=>{
      await op.update({product_quantity: getRandom(1,10) });
    })

    // Orders
    const ord = await Order.findAll();
    ord.forEach(async(or)=>{
      await or.update(
        {
          userId: getRandom(1,1000),
          paymentId: getRandom(1,600),
          deliveryId: getRandom(1,500)
        });
    })

    const admins = await Users_rols.findAll({where: {rolId: 1},limit:5}) 
    pr.forEach(async(p)=>{
      await p.update({usersRolId: admins[getRandom(0,admins.length-1)].dataValues.id} );
    })
    


    console.log('DB LOADED SUCCESSFULLY!');
    return;
  } catch (err) {
    console.log("entro al catch de la carga de datos en la DB!");
    console.log(err);
  }
};
