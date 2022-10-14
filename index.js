const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const startServer = () => {
  server.listen(80, () => {
    console.log("Listening at 80");
  });
};

const startDB = async () => {
  return await conn.sync({ force: true });
};

const start = async () => {
  await startDB();
  startServer();
}

start();