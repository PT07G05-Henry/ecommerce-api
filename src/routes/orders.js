const { Router } = require("express");
const { Order, User, Delivery, Product, Payment } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configura las funciones

const getOrders = async function (userId, status, order) {

    let orders = await Order.findAll({
        where: status ? {
            status: status
        }
        : {},
        include: userId ? 
        [
            {
                model: User,
                where: { id: userId },
            },
        ]
        : [{model: User}],
        order: order 
            ? [["total_price", order]] 
            : [["id", "asc"]] 
    });
    return orders;
}


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async(req, res)=>{
    const { userId, status, order } = req.query
    try {
        let orders = await getOrders(userId, status, order)
        orders
            ? res.status(200).send(orders)
            : res.status(404).send({ error: "Order Not Found" });
    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
    
});

router.get("/:id", async(req, res)=>{
    const id = req.params.id
    try {
        let order = await Order.findByPk(id, {
            include: [User, Delivery, Product, Payment]
        })
        order 
            ? res.status(200).send(order)
            : res.status(404).send({ error: 'Order Not Found' })
    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
})

router.post("/", async (req, res) => {
    //falta escribir acá
});

router.put("/", async (req, res) => {
    //falta escribir acá
});

router.delete("/", async (req, res) => {
    //falta escribir acá
});


module.exports = router;