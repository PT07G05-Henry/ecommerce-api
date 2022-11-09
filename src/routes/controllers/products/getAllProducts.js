const { Product } = require("../../../db");

const getAllProducts = async (req, res)=>{
    try{
        const products = await Product.findAll();
        res.status(200).json(products)

    }catch(err){
    console.log(err)
    res.status(200).send("error")
    }
}

module.exports = { getAllProducts };