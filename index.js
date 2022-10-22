const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const loadDb = require("./src/loadDb.js");
require("dotenv").config();
const { PORT } = process.env;

const startServer = () => {
  server.listen(PORT, async () => {
    await loadDb(); // cargando la base de datos con datos mockeados de la mockapi
    console.log("Listening at PORT " + PORT);
  });
};

const startDB = async () => {
  return await conn.sync({ force: true });
};

const start = async () => {
  await startDB();
  startServer();
};

start();
