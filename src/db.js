require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`,
    {
        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
    .filter(
        (file) =>
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, "/models", file)));
    });

// Inyectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Product, Category, Order, Payment, Delivery, Rol, Users_rols, Comment} = sequelize.models;

// Aca vendrían las relaciones
Product.belongsToMany(Category, { through: 'products_categories', timestamps: false  });
Category.belongsToMany(Product, { through: 'products_categories', timestamps: false });   
 
Product.belongsToMany(Order, { through: 'orders_products', timestamps: false  });
Order.belongsToMany(Product, { through: 'orders_products', timestamps: false });

User.hasMany(Order);    
Order.belongsTo(User);

Payment.hasOne(Order);
Order.belongsTo(Payment);

Delivery.hasMany(Order);
Order.belongsTo(Delivery);

User.belongsToMany(Rol, {through: 'users_rols', timestamps: false});
Rol.belongsToMany(User, {through: 'users_rols', timestamps: false});

Users_rols.hasMany(Product);
Product.belongsTo(Users_rols);

User.hasMany(Comment);
Comment.belongsTo(User);

Product.hasMany(Comment);
Comment.belongsTo(Product);


module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { User, Otro, OtroMas } = require('./db.js');
    conn: sequelize, // para importar la conexión { conn } = require('./db.js');
    Op
};       