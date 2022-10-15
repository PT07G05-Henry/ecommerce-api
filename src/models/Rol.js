const { DataTypes } = require("sequelize");
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("rol", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
  },{
    timestamps: false,
  });
};
