const { Sequelize } = require("../db");
const { Tag, Image, ImageTag } = require("../models");
const { transformNumber } = require("./common/common");

class tagService {
  getImagesByTag = async (tagId, sortBy) => {
    let order = [];
    if (sortBy === "popularity") {
      order.push(["popularity", "DESC"]);
    } else {
      order.push(["createdAt", "DESC"]);
    }
    const imageTags = await ImageTag.findAll({ where: { tagId } });
    const imagesIds = [];
    imageTags.forEach((imageTag) => {
      imagesIds.push(imageTag.dataValues.imageId);
    });
    const images = await Image.findAndCountAll({
      where: {
        id: {
          [Sequelize.Op.in]: imagesIds,
        },
      },
      order,
    });
    const processedImages = { rows: [] };
    processedImages.count = transformNumber(images.count);
    images.rows.forEach((image) => {
      image.dataValues.src = image.dataValues.fileName;
      delete image.dataValues.fileName;
      processedImages.rows.push(image.dataValues);
    });
    return processedImages;
  };
  findTags = async (substring) => {
    const tags = await Tag.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: Sequelize.literal(`\"%${substring}%\"`),
        },
      },
    });
    return tags;
  };
}

module.exports = new tagService();
