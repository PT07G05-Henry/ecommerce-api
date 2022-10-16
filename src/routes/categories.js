const { Router } = require("express");
const { Category } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configura las funciones

const getAllCategory = async ()=>{
    const categories = await Category.findAll();
    return categories;
};

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
    try{
        res.status(200).send(getAllCategory())
    }catch(err){
        res.status(404).send({err})
    }
});

router.post("/", async (req, res) => {
    //falta escribir acá
});

router.put("/", async (req, res) => {
    //falta escribir acá
});

router.delete("/", async (req, res) => {
    //falta escribir acá
});

router.all("*", async (req, res) => {
  res.redirect("/");
});


module.exports = router;