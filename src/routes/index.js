const { Router } = require("express");
const {User, Product, Payment, Delivery, Category, Products_Categories, Order_Products, Order} = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const consulproduct = async () => {
  
  return await Product.findAll({
      include: {
          model: Category,
          attributes: ["name"],
        through: {
              attributes: [],
          }, 
      }
  })

} 

const consulUser = async () => {
  
  return await User.findAll

} 

router.get('/product', async(req, res) => {
  
  const product_name  = req.query.productname
  let articulo = await consulproduct();
  
 
  if (product_name) {

      let buscararticulo = await articulo.filter(e => e.name.toLowerCase().includes(product_name.toLowerCase()))
      buscararticulo.length ? res.status(200).send(buscararticulo) : res.status(404).send("No existe articulo")
  }
  
  else {
    
      return res.status(200).send(articulo)
      


  }

   })   
  
   router.post('/product', async function (req, res) {
    try {
     const { product_name, category, price,description, stock, images, rating, comments, options} = req.body;
     let newProduct = await Product.create({
            product_name,
            price,description,
            stock,
            images,
            rating,
            comments,
            options
                                       
         })

                        

  let tempbase = await Category.findAll({
         where: {
            name : category
         }
     }) 
                
                 
       newProduct.addCategories(tempbase) 
         res.send("Producto agregado con exito")
 } catch(error){
     res.status(401).send(error + " No se cargo Producto")

 } 
 
      
     
 })

 router.get('/user', async(req, res) => {
  
  const user_name  = req.query.user
  let user = await consulUser();
  
 
  if (user_name) {

      let finduser = await user.filter(e => e.username.toLowerCase().includes(user_name.toLowerCase()))
      finduser.length ? res.status(200).send(finduser) : res.status(404).send("No existe usuario")
  }
  
  else {
    
      return res.status(200).send(user)


  } })

  router.post('/user', async function (req, res) {
    try {
     const { username, firs_name, last_name, birth_date, email, password, profile_picture, rol} = req.body;
     let newProduct = await Product.create({
            username,
            firs_name,
            last_name,
            birth_date,
            email,
            password,
            profile_picture,
            rol
                                       
         })

                
     
         res.send("Usuario agregado con exito")
 } catch(error){
     res.status(401).send(error + " No se cargo Usuario")

 } 
 
      
     
 })



router.get("/test", async (req, res) => {
  res.status(200).send({ hi: "Hello world!!!" })
});

router.all("*", (req, res) => {
  res.redirect("/");
});

router;

module.exports = router;