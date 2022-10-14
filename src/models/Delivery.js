const { DataTypes } = require("sequelize");
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("delivery", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [
          [
            "Home Delivery",
            "Shipping to a delivery ponint",
            "Express shipping.",
            "Standard Shipping",
            "International Shipping",
          ],
        ],
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["On the way", "Pre-admission", "Delivered"]],
      },
    },
    shipping_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        isPhoneNumber(value) {
          if (/^[+]\d{1,3}[-]\d{1,3}[-]\d{7,7}/.test(value)) {
            throw new Error("Invalid format");
          }
        },
      },
    },
  });
};
