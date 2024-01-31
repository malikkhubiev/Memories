const ApiError = require("../error/ApiError");
const { getImagesByTag, findTags } = require("../services/tagService");

class tagController {
    getImagesByTag = async (req, res, next) => {
        try {
            let { tagId, sortBy } = req.params;
            tagId = +tagId.slice(1);
            sortBy = sortBy.slice(1);
            if (!tagId) throw new Error(
                "You didn't provide the tag"
            );
            const images = await getImagesByTag(tagId, sortBy);
            res.json(images);
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
    findTags = async (req, res, next) => {
        try {
            let { substring } = req.params;
            substring = substring.slice(1);
            const tags = await findTags(substring);
            res.json(tags);
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
};

module.exports = new tagController();