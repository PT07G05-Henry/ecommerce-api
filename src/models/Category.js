const { DataTypes } = require("sequelize");
const isImgUrl = require("../functions/isImgUrl")
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
      unique: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        async customValidator(value){
          if(! await isImgUrl(value)){
            throw new Error("Image url is broken");
          }
        }
      },
    },
  },
  {
    timestamps: false,
  });
};
