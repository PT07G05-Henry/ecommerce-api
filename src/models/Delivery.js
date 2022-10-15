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
      type: DataTypes.ENUM,
      values: [
        "Home Delivery",
        "Shipping to a delivery point",
        "Express Shipping",
        "Standard Shipping",
        "International Shipping",
      ],
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["On the way", "Pre-admission", "Delivered"],
      allowNull: false,
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
