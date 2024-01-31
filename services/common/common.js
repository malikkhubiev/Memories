const { Sequelize } = require("../../db");
const { User, ImageTag, Tag, ImageLike, UserBlocked, Comment, NotInterestedImage, CommentLike, Chat, ImageView, SavedImage } = require("../../models");

const imagesProcessing = async (images, ownId) => {
    const updatedImages = [];
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        // maybe user is blocked or imageIsPrivate or image isn't interesting for user
        if (image.authorId !== ownId && image.isPrivate) continue;
        const notInterestedImages = await NotInterestedImage.findAll({ where: { userId: ownId } });
        const notInterestedImagesIds = notInterestedImages.map(notInterestedImage => notInterestedImage.imageId);
        if (notInterestedImagesIds.includes(image.id)) continue;
        const blockedUser = await UserBlocked.findOne({
            where: {
                BlockedId: {
                    [Sequelize.Op.or]: [ownId, image.authorId]
                }
            }
        });
        if (blockedUser) continue;
        // views
        const imageViews = await ImageView.findAndCountAll({
            where: {
                imageId: image.id
            }
        });
        image.dataValues.numberOfViews = transformNumber(imageViews.count || 0);
        // fileName to src
        image.dataValues.src = image.dataValues.fileName;
        delete image.dataValues.fileName;
        // author
        const author = await User.findOne({ where: { id: image.authorId } });
        image.dataValues.authorName = author.name;
        image.dataValues.avatar = author.avatar;
        image.dataValues.isOwn = ownId === image.authorId;
        // tags
        const imageTags = await ImageTag.findAll({ where: { imageId: image.id } });
        const tagsIds = [];
        imageTags.forEach(imageTag => {
            tagsIds.push(imageTag.tagId);
        });
        const tags = await Tag.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: tagsIds
                }
            }
        });
        image.dataValues.tags = tags;
        // likes
        const imageLikes = await ImageLike.findAndCountAll({ where: { imageId: image.id } });
        const likersIds = imageLikes.rows.map(imageLike => imageLike.userId);
        let isLiked = false;
        if (likersIds.includes(ownId)) isLiked = true;
        image.dataValues.numberOfLikes = imageLikes.count;
        image.dataValues.isLiked = isLiked;
        // comments
        const comments = await Comment.findAndCountAll({ where: { imageId: image.id } });
        const updatedComments = [];
        for(let j = 0; j<comments.rows.length; j++){
            const comment = comments.rows[j];
            const author = await User.findOne({where: {id: comment.authorId}});
            comment.dataValues.authorName = author.name;
            comment.dataValues.avatar = author.avatar;
            const commentsLikes = await CommentLike.findAndCountAll({where: {commentId: comment.id}});
            const commentLikersIds = commentsLikes.rows.map(commentLike => commentLike.userId);
            let isCommentLiked = false;
            if (commentLikersIds.includes(ownId)) isCommentLiked = true;
            comment.dataValues.numberOfLikes = commentsLikes.count;
            comment.dataValues.isLiked = isCommentLiked;
            updatedComments.push(comment.dataValues);    
        };
        image.dataValues.numberOfComments = comments.count;
        image.dataValues.comments = comments.rows;
        // is Saved
        const savedImage = await SavedImage.findOne({where: {
            userId: ownId,
            imageId: image.dataValues.id
        }});
        image.dataValues.isSaved = Boolean(savedImage); 
        // result
        updatedImages.push(image.dataValues);
    };
    return {
        rows: updatedImages,
        count: transformNumber(updatedImages.length)
    };
};

const transformNumber = (number) => {
    if (number > 999999) {
        number = `${number / 1000000}M`;
    } else if (number > 9999) {
        number = `${number / 1000}K`;
    };
    return `${number}`;
};

const clearOrDeleteOneChatItem = async (chatId, chatterId) => {
    const chat = await Chat.findOne({ where: { id: chatId } });
    let chatterNumber;
    if (chat.firstChatterId === chatterId) chatterNumber = "visibleForFirstChatter";
    if (chat.secondChatterId === chatterId) chatterNumber = "visibleForSecondChatter";
    let updateObject = {};
    updateObject[chatterNumber] = false;
    return updateObject;
};

module.exports = {
    imagesProcessing,
    transformNumber,
    clearOrDeleteOneChatItem
}