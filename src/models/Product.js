const { constants } = require("crypto");
const { DataTypes } = require("sequelize");
const isImgUrl = require("../functions/isImgUrl");
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      images: {
        type: DataTypes.TEXT,
        // allowNull: false,
        get: function () {
          return JSON.parse(this.getDataValue("images"));
        },
        set: function (val) {
          if(val.length === 0){             
            return this.setDataValue('images',JSON.stringify([{"image":"https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}]));
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
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          max: 5,
          min: 0,
        },
        defaultValue: 0,
      },
      // comments: {
      //   type: DataTypes.ARRAY(DataTypes.TEXT),
      // },
      // options: {
      //   type: DataTypes.STRING,
      // },
    },
    {
      timestamps: false,
    }
  );
};
