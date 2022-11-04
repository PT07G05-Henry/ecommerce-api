const { DataTypes } = require("sequelize");
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      set(value) {
        this.setDataValue("status", value.toUpperCase());
      },
      values: ["PENDING", "APPROVED", "AUTHORIZED", "REJECTED", "CANCELLED"],
      allowNull: false,
    },
  });
};
