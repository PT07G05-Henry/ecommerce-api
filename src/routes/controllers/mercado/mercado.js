const axios = require("axios");
var mercadopago = require("mercadopago");
require("dotenv").config();

const { ACCESS_TOKEN_TEST_MP } = process.env;

const createLinkMP = async (req, res) => {// se comporta como un POST para mandar body
  // res.json(req.body); // DESGLOZAR LOS DATOS NECESARIOS PARA MANDAR A LA API DE MERCADO PAGO
  // HAY QUE CREAR UN OBJETO DATA DESDE req.body con el formato que exige MP
  /*
  Como minimo:
  [
    {
        "title": "Placa Base4",
        "quantity": 1,
        "currency_id": "ARS",
        "unit_price": 10.5
    },
    {
        "title": "Placa Base5",
        "quantity": 1,
        "currency_id": "ARS",
        "unit_price": 10.5
    }
]
  
  */
  const dat = req.body.products;
  const id_orden = req.id_orden; // Me lo traigo del middleware /middlewares/createOrder.js

  mercadopago.configure({
    access_token: ACCESS_TOKEN_TEST_MP,
  });

  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;
  const port = process.env.PORT || PORT;
  const query = req.query;

  let preference = {
    //podemos hacer un map de varios productos depende de como lo manden

    items: dat,
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
  mercadopago.preferences
    .create(preference)
    .then((r) => {
      res.json(r.body.init_point); // URL QUE FRONT DEBE PONER EN EL ONCLICK DEL BOTON CHECKOUT
    })
    .catch((error) => {
      console.log(error);
      res.json(error)
    });
};

const notificacionorden = (req, res) => {
  // ACA SE ACTUALIZA LA DB CON LA INFO DEL PAGO PARA LUEGO REDIRIGIR AL CLIENTE CON EL RESULTADO DEL PAGO
  console.log("notificaciones");
  const respuesta = req.query;

  console.log("notificaciones");
  console.log(respuesta);

  res.send("noti");
};

module.exports = { createLinkMP, notificacionorden };
