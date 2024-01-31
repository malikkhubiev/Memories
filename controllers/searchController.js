const ApiError = require("../error/ApiError");
const { getTagsBySubstring, getUsersBySubstring, getFollowersOrFollowingsBySubstr, getBlockedUsersBySubstr, getImageLikers } = require("../services/searchService");

class searchController {
    getTagsBySubstring = async (req, res, next) => {
        try {
            let { substring } = req.params;
            substring = substring.slice(1);
            const tags = await getTagsBySubstring(substring);
            res.json(tags);
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
    getUsersBySubstring = async (req, res, next) => {
        try {
            const { id } = req.body;
            let { substring } = req.params;
            substring = substring.slice(1);
            const users = await getUsersBySubstring(id, substring);
            res.json(users);
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
    getFollowersOrFollowingsBySubstr = async (req, res, next) => {
        try {
            const { id } = req.body;
            let { substring, who } = req.params;
            substring = substring.slice(1);
            who = who.slice(1);
            if (!who) throw new Error(
                "You didn't provide the user"
            );
            const users = await getFollowersOrFollowingsBySubstr(id, substring, who);
            res.json(users);
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
    getBlockedUsersBySubstr = async (req, res, next) => {
        try {
            const { id } = req.body;
            let { substring } = req.params;
            substring = substring.slice(1);
            const blockedUsers = await getBlockedUsersBySubstr(id, substring);
            res.json(blockedUsers);
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
    getImageLikers = async(req, res, next) => {
        try {
            const { id: userId} = req.body;
            let { id: imageId, substring } = req.params;
            imageId = +imageId.slice(1);
            substring = substring.slice(1);
            if (!imageId) throw new Error(
                "You didn't provide the image"
            );
            if (!substring) substring = null;
            const likers = await getImageLikers(userId, imageId, substring);
            res.json(likers);
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        }
    };
};

module.exports = new searchController();