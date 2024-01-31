const { Sequelize } = require("../db");
const { Tag, User, UserBlocked, UserFollowers, ImageLike } = require("../models");
const { transformNumber } = require("./common/common");

class searchService {
    getTagsBySubstring = async (substring) => {
        const tags = await Tag.findAll({
            where: {
                name: {
                    [Sequelize.Op.like]: Sequelize.literal(`\"%${substring}%\"`)
                },
                isPrivate: false
            }
        });
        return tags;
    };
    getUsersBySubstring = async (id, substring) => {
        const users = await User.findAll({
            where: {
                name: {
                    [Sequelize.Op.like]: Sequelize.literal(`\"%${substring}%\"`)
                },
            },
            attributes: ["id", "name", "avatar"]
        });
        const blockedUsers = await UserBlocked.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { BlockedId: id },
                    { userId: id }
                ]
            },
            attributes: ["BlockedId", "userId"]
        });
        let updatedUsers = users;
        if (blockedUsers.length) {
            updatedUsers = [];
            blockedUsers.forEach(potentialBlocked => {
                users.forEach(user => {
                    if (user.id !== id) {
                        if (
                            user.id !== potentialBlocked.BlockedId &&
                            user.id !== potentialBlocked.userId
                        ) updatedUsers.push(user.dataValues);    
                    }else{
                        updatedUsers.push(user);
                    };
                })
            });
        };
        return updatedUsers;
    };
    getFollowersOrFollowingsBySubstr = async (id, substring, who) => {
        let result = [];
        let followingIds = await UserFollowers.findAndCountAll({
            where: { FollowerId: id },
            attributes: ["userId"]
        });
        if (followingIds.rows.length) {
            followingIds = followingIds.rows.map(id => id.dataValues.userId);
        };
        if (who === "followers") {
            let followersIds = await UserFollowers.findAndCountAll({
                where: { id },
                attributes: ["FollowerId"]
            });
            if (followersIds.rows.length) {
                followersIds = followersIds.map(id => id.dataValues.FollowerId);
            };
            let followers = await User.findAll({
                where: {
                    id: {
                        [Sequelize.Op.in]: followersIds
                    },
                    name: {
                        [Sequelize.Op.like]: Sequelize.literal(`\"%${substring}%\"`)
                    }
                },
                attributes: ["id", "avatar", "name", "isOpened"]
            });
            const blockedUsers = await UserBlocked.findAll({
                where: {
                    [Sequelize.Op.or]: [
                        { BlockedId: id },
                        { userId: id }
                    ]
                },
                attributes: ["BlockedId", "userId"]
            });
            let filteredFollowers = [];
            if (blockedUsers.length) {
                followers.forEach(follower => {
                    blockedUsers.forEach(bu => {
                        if (
                            !(follower.dataValues.id === bu.dataValues.BlockedId &&
                            id === bu.dataValues.userId
                            ||
                            follower.dataValues.id === bu.dataValues.userId &&
                            id === bu.dataValues.BlockedId)
                        ) filteredFollowers.push(follower);
                    });
                });
            }else{
                filteredFollowers = followers;
            };
            result = filteredFollowers.map(follower => {
                const returnValue = {...follower.dataValues};
                if (followingIds.includes(follower.id))
                    returnValue.amIFollowed = true;
                return returnValue;
            });
        }else{
            let following = await User.findAll({
                where: {
                    id: {
                        [Sequelize.Op.in]: followingIds
                    },
                    name: {
                        [Sequelize.Op.like]: Sequelize.literal(`\"%${substring}%\"`)
                    } 
                },
                attributes: ["id", "avatar", "name"]
            });
            const blockedUsers = await UserBlocked.findAll({
                where: {
                    [Sequelize.Op.or]: [
                        { BlockedId: id },
                        { userId: id }
                    ]
                },
                attributes: ["BlockedId", "userId"]
            });
            let filteredFollowing = [];
            if (blockedUsers.length) {
                following.forEach(following => {
                    blockedUsers.forEach(bu => {
                        if (
                            !(following.dataValues.id === bu.dataValues.BlockedId &&
                            id === bu.dataValues.userId
                            ||
                            following.dataValues.id === bu.dataValues.userId &&
                            id === bu.dataValues.BlockedId)
                        ) filteredFollowing.push(following);
                    });
                });
            }else{
                filteredFollowing = following
            };
            result = filteredFollowing.map(followinger => ({
                ...followinger.dataValues,
                amIFollowed: true
            }));
        };
        return result;
    };
    getBlockedUsersBySubstr = async (id, substring) => {
        const userBlocked = await UserBlocked.findAll({
            where: {
                userId: id
            }
        });
        const blockedUsersIds = userBlocked.map(ub => {
            if (ub.dataValues.userId === id)
                return ub.dataValues.BlockedId
            else return ub.dataValues.userId;
        });
        const blockedUsers = await User.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: blockedUsersIds
                },
                name: {
                    [Sequelize.Op.like]: Sequelize.literal(`\"%${substring}%\"`)
                }
            },
            attributes: ["id", "name", "avatar"]
        });
        const updatedBlockedUsers = blockedUsers.map(bu => {
            const updatedBlockedUser = {...bu.dataValues};
            updatedBlockedUser.isBlocked = true;
            return updatedBlockedUser;
        });
        return updatedBlockedUsers;
    };
    getImageLikers = async (id, imageId, substring) => {
        const imageLikes = await ImageLike.findAll({where: {imageId}});
        const likers = [];
        if (substring) {
            const likersIds = [];
            imageLikes.forEach(imageLike => likersIds.push(imageLike.dataValues.userId));
            const users = await User.findAll({
                where: {
                    id: {
                        [Sequelize.Op.in]: likersIds
                    },
                        name: {
                        [Sequelize.Op.like]: Sequelize.literal(`\"%${substring}%\"`)
                    }
                },
                attributes: ["id", "name", "avatar"]
            });
            const blockedUsers = await UserBlocked.findAll({
                where: {
                    [Sequelize.Op.or]: [
                        { BlockedId: id },
                        { userId: id }
                    ]
                },
                attributes: ["BlockedId", "userId"]
            });
            let filteredUsers = [];
            if (blockedUsers.length) {
                users.forEach(user => {
                    blockedUsers.forEach(bu => {
                        if (
                            !(user.dataValues.id === bu.dataValues.BlockedId &&
                            id === bu.dataValues.userId
                            ||
                            user.dataValues.id === bu.dataValues.userId &&
                            id === bu.dataValues.BlockedId)
                        ) filteredUsers.push(user.dataValues);
                    });
                });
            }else{
                filteredUsers = users;
            };
            filteredUsers.forEach(user => likers.push(user.dataValues));
        }else{
            for(let i = 0; i<imageLikes.length; i++){
                const imageLike = imageLikes[i].dataValues;
                const user = await User.findOne({
                    where: {
                        id: imageLike.userId,
                    },
                    attributes: ["id", "name", "avatar"]
                });
                const blockedUsers = await UserBlocked.findAll({
                    where: {
                        [Sequelize.Op.or]: [
                            { BlockedId: id },
                            { userId: id }
                        ]
                    },
                    attributes: ["BlockedId", "userId"]
                });
                let checkPassed = true;
                if (blockedUsers.length) {
                    blockedUsers.forEach(bu => {
                        if (
                            user.dataValues.id === bu.dataValues.BlockedId &&
                            id === bu.dataValues.userId
                            ||
                            user.dataValues.id === bu.dataValues.userId &&
                            id === bu.dataValues.BlockedId
                        ) checkPassed = false; 
                    });
                };
                if (checkPassed) likers.push(user.dataValues);
            };
        };
        return {
            count: transformNumber(likers.length),
            rows: likers
        };
    };
};

module.exports = new searchService();