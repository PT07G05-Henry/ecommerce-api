const axios = require("axios");
var mercadopago = require("mercadopago");
require("dotenv").config();

const { ACCESS_TOKEN_TEST_MP } = process.env;

const createLinkMP = async (req, res) => {
  const data = req.body.mercadoData;
  const { sid } = req.query;
  console.log(sid);
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
    metadata: { sid: sid },
    external_reference: `${id_orden}`, // por query le paso el numero de orden
    init_point: "Modal",
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
      success: `${protocol}://${host}:${port}/orders/mercadoResponse`,
      failure: `${protocol}://${host}:${port}/orders/mercadoResponse`,
      pending: `${protocol}://${host}:${port}/orders/mercadoResponse`,
    },
  };
  //console.log("mercadoData");
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

// const mercadoResponse = (req, res, next) => {
//   ACA SE ACTUALIZA LA DB CON LA INFO DEL PAGO PARA LUEGO REDIRIGIR AL CLIENTE CON EL RESULTADO DEL PAGO
//   console.log("Mercado response");
//   const response = req.query;

//   res.send("volviendo al back");
//   next();
// };

module.exports = { createLinkMP };

/*
req.query {
  collection_id: '51132534220',
  collection_status: 'approved',
  payment_id: '51132534220',
  status: 'approved',
  external_reference: 'undefined',
  payment_type: 'account_money',
  merchant_order_id: '6366023385',
  preference_id: '1229181489-c6c02bd8-3a50-4351-b3d0-ebe6517dafb3',
  site_id: 'MLA',
  processing_mode: 'aggregator',
  merchant_account_id: 'null'
}
*/

/*
"payer": {
        "name": "Juan",
        "surname": "Lopez",
        "email": "user@email.com",
        "phone": {
            "area_code": "11",
            "number": "4444-4444"
        },
        "identification": {
            "type": "DNI",
            "number": "12345678"
        },
        "address": {
            "street_name": "Street",
            "street_number": 123,
            "zip_code": "5700"
        }
    },

*/
