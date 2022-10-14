const { DataTypes } = require("sequelize");
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("category", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("name", value.toUpperCase());
      },
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isImage(value) {
          if (/\.(jpg|jpeg|png|webp|avif|gif)$/.test(value)) {
            throw new Error("Invalid format");
          }
        },
      },
    },
  });
};
