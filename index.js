const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const loadDb = require("./src/loadDb.js");

const startServer = () => {
  server.listen(80, async () => {
    await loadDb(); // cargando la base de datos con datos mockeados de la mockapi
    console.log("Listening at 80");
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
