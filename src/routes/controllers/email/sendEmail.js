require("dotenv").config();
const { GMAIL_PASSWORD } = process.env;
const nodemailer = require("nodemailer")
const htmlTesting = require("./templates/htmlTesting");
const htmlNewUserEmail = require("./templates/newUserEmail");
const htmlNewBuyCart = require("./templates/newBuyCart")

const emailExample = async (req, res) => {
    const {email, asunto, mensaje, tipo, products, directionAddress, totalPrice} = req.body; //tipo es para saber que tipo de correo enviar
 nodemailer.createTestAccount((err,account)=>{
    var htmlEmail = `
    <html>
    <body>
    <h3>Email Enviado</h3>
    <ul>
        <li>Email: ${email}</li>
        <li>Asunto: ${asunto}</li>
    </ul>
    <h3>Mensaje</h3>
    <p>${mensaje}</p>
    </body>
    </html>
    `;
    if(tipo === "newUserEmail"){
        htmlEmail = htmlNewUserEmail(email, asunto, mensaje)
    }
    if(tipo === "newBuyCart"){
        htmlEmail = htmlNewBuyCart(email, asunto, mensaje, products, directionAddress, totalPrice)
    }
    //const htmlPrueba = htmlTesting(email, asunto, mensaje);
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "techmerchpt@gmail.com", //el email del servicio SMTP que a utilizar
            pass: GMAIL_PASSWORD //contraseña protegida por .env del email de arriba
        }
    });
    let mailOptions = {
        from: "techmerchpt@gmail.com", //quien manda el email
        to: req.body.email, // el email destino
        replyTo: "techmerchpt@gmail.com",
        subject: req.body.asunto, //El asunto del email
        text: req.body.mensaje, //el mensaje
        html: htmlEmail // La parte html del email
    };
    transporter.sendMail(mailOptions, (err,info) =>{
        if(err){
            console.log(err)
            return res.status(404).send("Hubo un Error");
        }
        console.log("Mensaje enviado: %s", info.mensaje);
        console.log("Url del mensaje: %s", nodemailer.getTestMessageUrl(info));
        return res.status(200).send("Enviado")
    });
 });
 
};

module.exports = { emailExample };