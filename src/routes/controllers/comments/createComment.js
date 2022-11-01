const { Comment, User, Product } = require("../../../db");

const createComment = async (req, res) => {
  const { value, productId, rating } = req.body;
  const { sid } = req.query;

  if (
    !value ||
    typeof value !== "string" ||
    parseInt(rating) < 0 ||
    parseInt(rating) > 5
  )
    return res.status(400).send("Data missing or incorrect");
  try {
    const userDb = await User.findOne({ where: { sid } });
    const product = await Product.findByPk(parseInt(productId));
    const newComment = await Comment.create({
      value,
      rating: parseInt(rating),
    });
    await newComment.setProduct(productId);
    await newComment.setUser(userDb.dataValues.id);

    const arrayRatingProductId = await Comment.findAll({
      where: { productId },
    });
    console.log("arrayRatingProductId", arrayRatingProductId);
    const arrayLength = arrayRatingProductId.length;
    const sumRatings = arrayRatingProductId.reduce((a, b) => {
      // console.log(a);
      // console.log(b.dataValues);
      return a + b.dataValues.rating;
    }, 0);
    console.log("sumRatings", sumRatings);
    console.log("arrayLength", arrayLength);
    await product.update({ rating: Number.parseInt(sumRatings / arrayLength) });
    res.status(201).json({
      idProduct: productId,
      idComment: newComment.dataValues.id,
      value,
      ratingUser: parseInt(rating),
      ratingProduct: Number.parseInt(sumRatings / arrayLength),
    });
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
};

module.exports = { createComment };
