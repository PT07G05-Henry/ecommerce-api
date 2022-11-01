const axios = require("axios");
var mercadopago = require("mercadopago");
require("dotenv").config();

const { ACCESS_TOKEN_TEST_MP } = process.env;

const createLinkMP = async (req, res) => {
  const data = req.body.mercadoData;
  console.log(data);
  const id_orden = req.id_orden;

  mercadopago.configure({
    access_token: ACCESS_TOKEN_TEST_MP,
  });

  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;
  const port = process.env.PORT || PORT;
  const query = req.query;

  let preference = {
    items: data,
    external_reference: `${id_orden}`, // por query le paso el numero de orden
    payment_methods: {
      exclude_payment_types: [
        //metodos de pago excluidos
        {
          id: "atm",
        },
      ],
      installments: 3, //cuotas permitidas
    },

    back_urls: {
      success: `${protocol}://${host}:${port}/mercado/notificacion`,
      failure: `${protocol}://${host}:${port}/mercado/notificacion`,
      pending: `${protocol}://${host}:${port}/mercado/notificacion`,
    },
  };
  //console.log(req.body);
  mercadopago.preferences
    .create(preference)
    .then((r) => {
      res.json(r.body.init_point); // DEBE SER UN OBJETO CON UNA PROPIEDAD URL Y OTRA DE ORDER_ID CREADA
    })
    .catch((error) => {
      console.log(error);
      res.json(error);
    });
};

const notificacionorden = (req, res) => {
  // ACA SE ACTUALIZA LA DB CON LA INFO DEL PAGO PARA LUEGO REDIRIGIR AL CLIENTE CON EL RESULTADO DEL PAGO
  console.log("notificaciones");
  const respuesta = req.query;

  console.log("notificaciones");
  console.log(respuesta);

  res.redirect("https://localhost:3000/"); // DEBERIA CERRAR LA VENTANA EMERGENTE Y VOLVER AL FRONT CON UN MENSAJE PERO NO FUNCIONA
};

module.exports = { createLinkMP, notificacionorden };
