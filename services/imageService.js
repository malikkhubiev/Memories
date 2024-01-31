const { Tag, ImageLike, ImageTag, User, SavedImage, HidenImage, NotInterestedImage, Image, Comment, ImageView } = require("../models");
const uuid = require("uuid");
const path = require("path");
const { Sequelize } = require("../db");
const { imagesProcessing } = require("./common/common");

class imageService {
    // Service's parts
    upload = async (authorId, description, tags, img) => {
        const fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
        const image = await Image.create(
            { authorId, description, fileName }
        );
        Tag.bulkCreate(tags, { ignoreDuplicates: true })
        .catch(e => console.log(e.message));
        tags = tags.map(tag => tag.name);
        let tagsFromDB = await Tag.findAll({
            where: {
                name: {
                    [Sequelize.Op.in]: tags
                }
            }
        });
        tagsFromDB = tagsFromDB.map(tag => {
            let tagId = tag["id"];
            const updatedTag = { ...tag.dataValues };
            delete updatedTag["id"];
            updatedTag["tagId"] = tagId;
            updatedTag["imageId"] = image.id;
            return updatedTag;
        });
        for (let i = 0; i < tagsFromDB.length; i++) {
            const tag = tagsFromDB[i];
            ImageTag.create({
                tagId: tag.tagId,
                imageId: tag.imageId
            }).catch((e) => console.log(e.message));
        };
        const imageTags = await ImageTag.findAll({ where: { imageId: image.id } });
        const tagsIds = imageTags.map(imageTag => imageTag.tagId);
        const tagsForImage = await Tag.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: tagsIds
                }
            }
        });
        const author = await User.findOne({ where: { id: image.authorId } });
        const src = image.dataValues.fileName;
        delete image.dataValues.fileName;
        const imageLikes = await ImageLike.findAndCountAll({ where: { id: image.id } });
        const comments = await Comment.findAndCountAll({ where: { imageId: image.id } });
        image.dataValues = {
            ...image.dataValues,
            authorName: author.name,
            avatar: author.avatar,
            isOwn: true,
            isLiked: false,
            numberOfLikes: imageLikes.count,
            src,
            tags: tagsForImage,
            comments: comments.rows,
            numberOfComments: comments.count
        };
        return image;
    };
    get = async (userId, imageId) => {
        // нужно несколько проверок
        const image = await Image.findOne({ where: { id: imageId } });
        const processedImages = await imagesProcessing([image], userId);
        return processedImages.rows[0];
    };
    save = async (userId, imageId) => {
        const maybeAlreadySavedImage = await SavedImage.findOne({ where: { userId, imageId } });
        if (maybeAlreadySavedImage) return;
        await SavedImage.create({ userId, imageId });
        await Image.increment('popularity', { by: 1, where: { id: imageId } });
    };
    unSave = async (userId, imageId) => {
        const maybeAlreadyUnsavedImage = await SavedImage.findOne({ where: { userId, imageId } });
        if (!maybeAlreadyUnsavedImage) return;
        await SavedImage.destroy({ where: { userId, imageId } });
        await Image.decrement('popularity', { by: 1, where: { id: imageId } });
    };
    hide = async (imageId) => {
        await Image.update({isPrivate: true}, {where: {id: imageId}});
    };
    show = async (imageId) => {
        await Image.update({isPrivate: false}, {where: {id: imageId}});
    };
    view = async (userId, imagesIds) => {
        await Image.increment('popularity', { by: 0.5, where: {
            id: {
                [Sequelize.Op.in]: imagesIds
            }
        }});
        const imageViewsData = [];
        imagesIds.forEach(imageId => {
            imageViewsData.push({
                imageId,
                userId
            })
        });
        for(let i = 0; i<imageViewsData.length; i++) {
            const {imageId, userId} = imageViewsData[i];
            const imageView = await ImageView.findOne({
                where: {
                    imageId,
                    userId
                }
            });
            if (!imageView) await ImageView.create({imageId, userId});
        };
    };
    like = async (userId, imageId) => {
        try {
            ImageLike.create({ userId, imageId }).catch(e => console.log(e.message));
            await Image.increment('popularity', { by: 2, where: { id: imageId } });
        } catch (e) {
            console.log(e.message);
        }
    };
    unLike = async (userId, imageId) => {
        await ImageLike.destroy({ where: { userId, imageId } });
        await Image.decrement('popularity', { by: 2, where: { id: imageId } });
    };
    notInterested = async (userId, imageId) => {
        const image = await NotInterestedImage.create({ userId, imageId });
        return image.id;
    };
    deleteImage = async (userId, imageId) => {
        await Image.destroy({
            where: {
                authorId: userId,
                id: imageId
            }
        });
    };
};

module.exports = new imageService();