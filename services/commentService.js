const { Comment, CommentLike, User, Image } = require("../models");

class commentService {
  add = async (authorId, imageId, text) => {
    const image = await Image.findOne({where: {id: imageId}});
    let isOwn;
    if (image.authorId === authorId) isOwn = true;
    else isOwn = false;
    const comment = await Comment.create({ authorId, imageId, text, isOwn });
    await Image.increment("popularity", { by: 20, where: { id: imageId } });
    const author = await User.findOne({ where: { id: authorId } });
    const commentLikes = await CommentLike.findAndCountAll({
      where: { commentId: comment.id },
    });
    comment.dataValues = {
      ...comment.dataValues,
      authorName: author.name,
      avatar: author.avatar,
      numberOfLikes: commentLikes.count,
      isLiked: false,
    };
    return comment.dataValues;
  };
  like = async (userId, commentId) => {
    await CommentLike.create({ userId, commentId });
  };
  unLike = async (userId, commentId) => {
    await CommentLike.destroy({ where: { userId, commentId } });
  };
  deleteComment = async (ownId, commentId) => {
    const comment = await Comment.findOne({ where: { id: commentId } });
    const image = await Image.findOne({ where: { id: comment.imageId } });

    if (comment.authorId === ownId || image.authorId === ownId)
      await Comment.destroy({ where: { id: commentId } });
    else throw new Error("You don't have such ability");

    console.log(2);
    await Image.decrement("popularity", {
      by: 20,
      where: { id: comment.imageId },
    });
  };
}

module.exports = new commentService();
