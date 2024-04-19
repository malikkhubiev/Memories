const { Sequelize } = require("../db");
const {
  User,
  Image,
  Preference,
  ImageTag,
  Tag,
  SavedImage,
  UserBlocked,
  UserFollowers,
  SubscriptionRequest,
} = require("../models");
const { imagesProcessing, transformNumber } = require("./common/common");

class userService {
  getPreferences = async (userId) => {
    const preferences = await Preference.findAll({ where: { userId } });
    const tagsIds = preferences.map((pref) => pref.tagId);
    const tags = await Tag.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: tagsIds,
        },
      },
    });
    const updatedPreferences = [];
    preferences.forEach((pref) => {
      const preference = {};
      preference.id = pref.id;
      preference.rating = pref.rating;
      tags.forEach((tag) => {
        if (tag.id === pref.id) {
          preference.name = tag.name;
        }
      });
      updatedPreferences.push(preference);
    });
    return updatedPreferences;
  };
  setPreferences = async (preferences, userId, isFirstTime) => {
    if (isFirstTime)
      await User.update({ isFirstTime: false }, { where: { id: userId } });
    const tagsArrayInObjectType = preferences.map((pref) => ({
      name: pref.name,
      rating: 100,
    }));
    const tagsArrayInStingType = preferences.map((pref) => pref.name);
    await Tag.bulkCreate(tagsArrayInObjectType, { ignoreDuplicates: true });
    const tagsFromDB = await Tag.findAll({
      where: {
        name: {
          [Sequelize.Op.in]: tagsArrayInStingType,
        },
      },
    });
    const processedTagsFromDb = {};
    tagsFromDB.forEach((tag) => {
      processedTagsFromDb[tag.name] = tag.id;
    });
    const preferencesForPrefs = preferences.map((pref) => ({
      userId,
      tagId: processedTagsFromDb[pref.name],
      rating: pref.rating,
    }));
    await Preference.bulkCreate(preferencesForPrefs, {
      updateOnDuplicate: ["rating"],
    });
  };
  getImagesByPreferences = async (id) => {
    const preferences = await Preference.findAll({
      where: { userId: id },
      order: [["rating", "DESC"]],
    });
    const tagsIds = preferences.map((pref) => pref.tagId);
    const imagesIds = [];
    for (let i = 0; i < tagsIds.length; i++) {
      try {
        const tagId = tagsIds[i];
        const imagesTags = await ImageTag.findAll({ where: { tagId } });
        imagesTags.forEach((imageTag) => {
          imagesIds.push(imageTag.imageId);
        });
      } catch (e) {
        console.log(e.message);
      }
    }
    const frequentlyImagesIds = {};
    imagesIds.forEach((imageId) => {
      if (frequentlyImagesIds[imageId]) {
        frequentlyImagesIds[imageId]++;
      } else {
        frequentlyImagesIds[imageId] = 1;
      }
    });
    const sortedFrequentlyImagesIds = [];
    for (let i = 0; i < Object.keys(frequentlyImagesIds).length; i++) {
      let theMostId = null;
      let theMostValue = 0;
      for (let position of Object.entries(frequentlyImagesIds)) {
        if (
          position[1] > theMostValue &&
          !sortedFrequentlyImagesIds.includes(position[0])
        ) {
          theMostValue = position[1];
          theMostId = position[0];
        }
      }
      sortedFrequentlyImagesIds.push(theMostId);
    }
    const sortedImages = [];
    for (let i = 0; i < sortedFrequentlyImagesIds.length; i++) {
      const image = await Image.findOne({
        where: {
          id: sortedFrequentlyImagesIds[i],
          isPrivate: false,
        },
      });
      if (image) sortedImages.push(image);
    }
    const processedImages = await imagesProcessing(sortedImages, id);
    return processedImages;
  };
  getOwnAndFollowingImages = async (id) => {
    const userIds = [id];
    const userFollowers = await UserFollowers.findAll({
      where: { followerId: id },
    });
    userFollowers.forEach((userFollower) => {
      userIds.push(userFollower.userId);
    });
    let images = await Image.findAll({
      where: {
        authorId: {
          [Sequelize.Op.in]: userIds,
        },
      },
      order: [["createdAt", "DESC"]],
    });
    const resultImages = await imagesProcessing(images, id);
    return resultImages.rows;
  };
  getImages = async (ownId, userId, imagesType, typeOfSorting) => {
    if (ownId !== userId) {
      const mayBeBlockedUser = await UserBlocked.findOne({
        where: {
          [Sequelize.Op.or]: [{ BlockedId: ownId }, { BlockedId: userId }],
        },
      });
      if (mayBeBlockedUser) throw new Error("You don't have an access");
    }
    let images;
    switch (imagesType) {
      case "ordinary":
        images = await Image.findAll({
          where: { authorId: userId, isPrivate: false },
          order: [[typeOfSorting, "ASC"]],
        });
        break;
      case "private":
        images = await Image.findAll({
          where: { authorId: userId, isPrivate: true },
          order: [[typeOfSorting, "ASC"]],
        });
        break;
      case "saved":
        const imagesIds = [];
        const savedImagesMiddleware = await SavedImage.findAll({
          where: {
            userId,
          },
        });
        savedImagesMiddleware.forEach((savedImageMiddleware) => {
          imagesIds.push(savedImageMiddleware.imageId);
        });
        images = await Image.findAll({
          where: {
            id: {
              [Sequelize.Op.in]: imagesIds,
            },
          },
          order: [["createdAt", "ASC"]],
        });
        break;
    }
    const processedImages = await imagesProcessing(images, ownId);
    return processedImages;
  };
  getUserProfile = async (ownId, userId) => {
    if (ownId !== userId) {
      const mayBeBlockedUser = await UserBlocked.findOne({
        where: {
          [Sequelize.Op.or]: [{ BlockedId: ownId }, { BlockedId: userId }],
        },
      });
      if (mayBeBlockedUser) throw new Error("You don't have an access");
    }
    const user = await User.findOne({ where: { id: userId } });
    const userCopy = JSON.parse(JSON.stringify(user));
    ["createdAt", "updatedAt", "password", "popularity"].forEach(
      (key) => delete userCopy[key],
    );

    // followers and followings
    let followersIds = await UserFollowers.findAndCountAll({
      where: { userId },
      attributes: ["FollowerId"],
    });
    if (followersIds.rows.length) {
      followersIds = followersIds.rows.map((id) => id.dataValues.FollowerId);
    } else {
      followersIds = [];
    }
    let followingIds = await UserFollowers.findAndCountAll({
      where: { FollowerId: userId },
      attributes: ["userId"],
    });
    if (followingIds.rows.length) {
      followingIds = followingIds.rows.map((id) => id.dataValues.userId);
    } else {
      followingIds = [];
    }
    let followers = await User.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: followersIds,
        },
      },
      attributes: ["id", "avatar", "name"],
    });
    let ownFollowingIds = await UserFollowers.findAndCountAll({
      where: { FollowerId: ownId },
      attributes: ["userId"],
    });
    if (ownFollowingIds.rows.length) {
      ownFollowingIds = ownFollowingIds.rows.map((id) => id.dataValues.userId);
    } else {
      ownFollowingIds = [];
    }
    const blockedUsers = await UserBlocked.findAll({
      where: {
        [Sequelize.Op.or]: [{ BlockedId: ownId }, { userId: ownId }],
      },
      attributes: ["BlockedId", "userId"],
    });
    let filteredFollowers = [];
    if (blockedUsers.length) {
      followers.forEach((follower) => {
        blockedUsers.forEach((bu) => {
          if (
            !(
              (follower.dataValues.id === bu.dataValues.BlockedId &&
                ownId === bu.dataValues.userId) ||
              (follower.dataValues.id === bu.dataValues.userId &&
                ownId === bu.dataValues.BlockedId)
            )
          )
            filteredFollowers.push(follower);
        });
      });
    } else {
      filteredFollowers = followers;
    }
    followers = filteredFollowers.map((follower) => {
      const returnValue = { ...follower.dataValues };
      if (ownFollowingIds.includes(follower.id)) returnValue.amIFollowed = true;
      return returnValue;
    });
    let following = await User.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: followingIds,
        },
      },
      attributes: ["id", "avatar", "name"],
    });
    let filteredFollowing = [];
    if (blockedUsers.length) {
      following.forEach((following) => {
        blockedUsers.forEach((bu) => {
          if (
            !(
              (following.dataValues.id === bu.dataValues.BlockedId &&
                ownId === bu.dataValues.userId) ||
              (following.dataValues.id === bu.dataValues.userId &&
                ownId === bu.dataValues.BlockedId)
            )
          )
            filteredFollowing.push(following);
        });
      });
    } else {
      filteredFollowing = following;
    }
    following = filteredFollowing.map((followinger) => ({
      ...followinger.dataValues,
      amIFollowed: true,
    }));

    const followersNumber = transformNumber(filteredFollowers.length);
    const followingNumber = transformNumber(filteredFollowing.length);
    userCopy.followers = { list: followers, number: followersNumber || "0" };
    userCopy.following = { list: following, number: followingNumber || "0" };
    let isOpenedForMe = false;
    if (
      userId === ownId ||
      user.isOpened ||
      (!user.isOpened && followersIds.includes(ownId))
    )
      isOpenedForMe = true;

    if (!isOpenedForMe) {
      userCopy.followers.list = [];
      userCopy.following.list = [];
    }

    let subRec = await SubscriptionRequest.findOne({
      where: {
        userId,
        subscriberId: ownId,
      },
    });
    if (subRec) userCopy.isRequestSended = true;

    // isOwn
    if (ownId === userId) userCopy.isOwn = true;
    else userCopy.isOwn = false;

    // amIFollowed
    let amIFollowed = false;

    if (ownId === userId) amIFollowed = false;
    else {
      followersIds.forEach((followerId) => {
        if (followerId === ownId) amIFollowed = true;
      });
    }
    userCopy.amIFollowed = amIFollowed;

    // images
    if (ownId !== userId && isOpenedForMe) {
      const usualImagesByDate = await this.getImages(
        ownId,
        userId,
        "ordinary",
        "createdAt",
      );
      const usualImagesByPopularity = await this.getImages(
        ownId,
        userId,
        "ordinary",
        "popularity",
      );
      userCopy.usualImagesByDate = usualImagesByDate;
      userCopy.usualImagesByPopularity = usualImagesByPopularity;
    }

    // blocked users
    const blockedUsersIds = await UserBlocked.findAll({
      where: { userId },
      attributes: ["BlockedId"],
    });
    const blocked = {
      rows: [],
      count: transformNumber(blockedUsersIds.length),
    };
    for (let i = 0; i < blockedUsersIds.length; i++) {
      const blockedUserId = blockedUsersIds[i].dataValues.BlockedId;
      const blockedUser = await User.findOne({
        where: { id: blockedUserId },
        attributes: ["id", "avatar", "name"],
      });
      blockedUser.dataValues.isBlocked = true;
      blocked.rows.push(blockedUser.dataValues);
    }
    userCopy.blocked = blocked;
    userCopy.isOpenedForMe = isOpenedForMe;
    return userCopy;
  };
  sendASubscriptionRequest = async (senderId, userId) => {
    await SubscriptionRequest.create({
      subscriberId: senderId,
      userId,
    });
  };
  confirmSubRequest = async (senderId, userId) => {
    await SubscriptionRequest.destroy({
      where: {
        subscriberId: userId,
        userId: senderId,
      },
    });
    await this.follow(userId, senderId);
  };
  denySubRequest = async (denier, userId) => {
    await SubscriptionRequest.destroy({
      where: {
        subscriberId: userId,
        userId: denier,
      },
    });
  };
  getRequests = async (id) => {
    const requests = await SubscriptionRequest.findAll({
      where: {
        userId: id,
      },
    });
    const result = [];
    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];
      const user = await User.findOne({
        where: {
          id: request.subscriberId,
        },
        attributes: ["id", "avatar", "name"],
      });
      result.push(user.dataValues);
    }
    return result;
  };
  follow = async (followerId, followingId) => {
    await UserFollowers.create({
      FollowerId: followerId,
      userId: followingId,
    });
  };
  unFollow = async (followerId, unFollowingId) => {
    await UserFollowers.destroy({
      where: {
        FollowerId: followerId,
        userId: unFollowingId,
      },
    });
  };
  block = async (blockerId, blockingId) => {
    await UserBlocked.create({
      BlockedId: blockingId,
      userId: blockerId,
    });
  };
  unBlock = async (blockerId, unBlockingId) => {
    await UserBlocked.destroy({
      where: {
        BlockedId: unBlockingId,
        userId: blockerId,
      },
    });
  };
}

module.exports = new userService();
