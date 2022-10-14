const { DataTypes } = require("sequelize");
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("payment", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["Credit Card", "Debit", "Bank Transfer", "Mercado Pago", "Cash"],
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Pending", "Complete", "Failed"],
      allowNull: false,
    },
  });
};
