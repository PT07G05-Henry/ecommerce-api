const { Comment } = require("../../db");

const isCommentOwner = async (commentId, userId) => {
  //console.log("idProduct", idProduct);
  //console.log("idUser", idUserRol);
  try {
    const result = await Comment.findOne({
      where: { id: Number.parseInt(commentId), userId },
    });
    //console.log(result);
    if (result) {
      console.log("is true");
      return true;
    }
    console.log("is false");
    return false;
  } catch (e) {
    console.log(e);
    return e.message;
  }
};

module.exports = { isCommentOwner };
