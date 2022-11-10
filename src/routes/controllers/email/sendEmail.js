require("dotenv").config();
const { GMAIL_PASSWORD } = process.env;
const nodemailer = require("nodemailer");
const htmlTesting = require("./templates/htmlTesting");
const htmlNewUserEmail = require("./templates/newUserEmail");
const htmlNewBuyCart = require("./templates/newBuyCart");
const htmlOrderStatus = require("./templates/orderStatus")

const sendEmail = async (req, res) => {
  const {
    email,
    subject,
    message,
    type,
    products,
    directionAddress,
    totalPrice,
    justSend,
    orderId,
    orderStatus
  } = req.body; //type es para saber que type de correo enviar

  if (!email || !subject || !message)
    return res.status(404).send("Data missing (Email, Subject Or Message)");
  nodemailer.createTestAccount((err, account) => {
    var htmlEmail = `
    <html>
    <body>
    <h3>Email Enviado</h3>
    <ul>
        <li>Email: ${email}</li>
        <li>Asunto: ${subject}</li>
    </ul>
    <h3>Mensaje</h3>
    <p>${message}</p>
    </body>
    </html>
    `;
    if (type === "orderStatus") {
      htmlEmail = htmlOrderStatus(orderId, orderStatus);
    }
    if (type === "newUserEmail") {
      htmlEmail = htmlNewUserEmail(email, subject, message);
    }
    if (type === "newBuyCart") {
      if (!products.length || !directionAddress || !totalPrice)
        return res
          .send(404)
          .send("Data missing (products, directionAddress or totalPrice)");
      htmlEmail = htmlNewBuyCart(
        email,
        subject,
        message,
        products,
        directionAddress,
        totalPrice
      );
    }
    //const htmlPrueba = htmlTesting(email, subject, message);
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "techmerchpt@gmail.com", //el email del servicio SMTP que a utilizar
        pass: GMAIL_PASSWORD, //contraseña protegida por .env del email de arriba
      },
    });
    let mailOptions = {
      from: "techmerchpt@gmail.com", //quien manda el email
      to: email, // el email destino
      replyTo: "techmerchpt@gmail.com",
      subject: subject, //El subject del email
      text: message, //el message
      html: htmlEmail, // La parte html del email
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(404).send("Error sending Email");
      }
      if(justSend){
        return res.status(200).send("Email Sended")
      }
      return res.redirect(req.query.responseMP);
    });
  });
};

module.exports = { sendEmail };
