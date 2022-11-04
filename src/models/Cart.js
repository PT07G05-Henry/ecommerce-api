const { DataTypes } = require("sequelize");
const isImgUrl = require("../functions/isImgUrl")
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("cart", {
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
      }
    },
    images: {
        type: DataTypes.TEXT,
        // allowNull: false,
        get: function () {
          return JSON.parse(this.getDataValue("images"));
        },
        set: function (val) {
          if (val.length === 0) {
            return this.setDataValue(
              "images",
              JSON.stringify([
                {
                  image:
                    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
                },
              ])
            );
          }
          return this.setDataValue("images", JSON.stringify(val));
        },
        validate: {
          async customValidator(value) {
            for (const img in value) {
              if (!(await isImgUrl(img.image))) {
                throw new Error("Image url is broken");
              }
            }
          },
        },
        defaultValue: JSON.stringify([
          {
            image:
              "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
          },
        ]),
      },
    price: {
        type: DataTypes.FLOAT
    },
    units: {
        type: DataTypes.INTEGER
    },
    productId :{
        type:DataTypes.INTEGER
    },
    userId:{
        type: DataTypes.INTEGER
    },
  },
  {
    timestamps: false,
  });
};