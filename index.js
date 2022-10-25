const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const loadDb = require("./src/loadDb.js");
require("dotenv").config();
const { PORT } = process.env;

const fs = require("fs");
const https = require("https");
const privateKey = fs.readFileSync("./sslcert/private.key", "utf8");
const certificate = fs.readFileSync("./sslcert/certificate.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, server);

/*const startServer = () => {
  server.listen(PORT, async () => {
   // await loadDb(); // cargando la base de datos con datos mockeados de la mockapi
    console.log("Listening at PORT " + PORT);
  });
};*/

const startServer = () => {
  httpsServer.listen(PORT, () => {
    console.log("Listening at PORT " + PORT);
  });
};

const startDB = async () => {
  await loadDb();
  return await conn.sync({ force: true });
};

const start = async () => {
  await startDB();
  startServer();
};

start();
