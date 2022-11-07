const { DataTypes } = require("sequelize");
const isImgUrl = require("../functions/isImgUrl")
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("cart", {
    
    items: {
        type: DataTypes.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue("items"));
        },
        set: function (val) {
          return this.setDataValue("items", JSON.stringify(val));
        },
        defaultValue: JSON.stringify([]),
      },
      userId:{
        type: DataTypes.INTEGER,
        unique:true
    },
  },
  {
    timestamps: false,
  });
};