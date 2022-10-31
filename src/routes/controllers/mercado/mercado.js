const axios= require("axios");
var mercadopago = require('mercadopago');


const crearorden = async (req, res) => {
    
    //TEST-1389129425495238-102519-d2aa690ff45a093dd76f09b2ad4f5e2e-1225203294
    const dat = req.body
    const id_orden = req.query.id_orden
    

   mercadopago.configure({
    access_token: 'TEST-1389129425495238-102519-d2aa690ff45a093dd76f09b2ad4f5e2e-1225203294'
});


let preference = {

  items:  //podemos hacer un map de varios productos depende de como lo manden
   
    dat
  ,
  external_reference : `${id_orden}`, // por query le paso el numero de orden
  payment_methods: {
    exclude_payment_types: [ //metodos de pago excluidos
      {
      id : "atm"
      }
    ],
    installments: 3 //cuotas permitidas
  },
  
  back_urls:{
  success :"https://localhost:3001/mercado/notificacion",
  failure :"https://localhost:3001/mercado/notificacion",
  pending :"https://localhost:3001/mercado/notificacion"
  }


};

mercadopago.preferences.create(preference)
.then((r)=>{
     res.json(r)
})
.catch((error) => {
    console.log(error)
})

};

const notificacionorden= (req, res)=>{
  console.log("notificaciones")
  const respuesta = req.query;
  
  console.log("notificaciones")
  console.log(respuesta)
   
    
   res.send("noti")
 
 

 
  

    
  };
 




module.exports = { crearorden, notificacionorden };