const { DataTypes } = require("sequelize");
const isImgUrl = require("../functions/isImgUrl");
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [0, 50],
            msg: "The First Name has too many characters",
          },
        },
        set(value) {
          this.setDataValue(
            "first_name",
            value &&
              value
                .toLowerCase()
                .split(" ")
                .map((w) => w[0].toUpperCase() + w.slice(1))
                .join(" ")
          );
        },
      },
      last_name: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [0, 50],
            msg: "The Last Name has too many characters",
          },
        },
        set(value) {
          this.setDataValue(
            "last_name",
            value &&
              value
                .toLowerCase()
                .split(" ")
                .map((w) => w[0].toUpperCase() + w.slice(1))
                .join(" ")
          );
        },
      },
      birth_date: {
        type: DataTypes.STRING,
        validate: {
          isDate: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Does not contain the email format",
          },
        },
      },
      // profile_picture: {
      //   type: DataTypes.TEXT,
      //   defaultValue:
      //     "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      // },
      profile_picture: {
        type: DataTypes.TEXT,
        // allowNull: false,
        get: function () {
          return JSON.parse(this.getDataValue("profile_picture"));
        },
        set: function (val) {
          if (!val) {
            return this.setDataValue(
              "profile_picture",
              JSON.stringify({
                secure_url:
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                public_Id: null,
              })
            );
          }
          return this.setDataValue("profile_picture", JSON.stringify(val));
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
      },
      social: {
        type: DataTypes.ENUM,
        values: ["google", "apple", "microsoft", "auth0"],
      },
      sid: {
        type: DataTypes.STRING(32),
      },
      direction:{
        type: DataTypes.STRING()
      },
      street1:{
        type: DataTypes.STRING()
      },
      street2:{
        type: DataTypes.STRING()
      },
      city:{
        type: DataTypes.STRING()
      },
      postalCode:{
        type: DataTypes.STRING()
      },
    },
    {
      timestamps: false,
    }
  );
};
