const ApiError = require("../error/ApiError");
const { add, like, unLike, deleteComment } = require("../services/commentService");
const Filter = require("bad-words");
const filter = new Filter();

class commentController {
    add = async (req, res, next) => {
        try {
            const { id: authorId, imageId, text } = req.body;
            
            if (!imageId) throw new Error("You didn't provide an image id");
            if (!text) throw new Error("You didn't provide a text");
            if (filter.isProfane(text)) next(ApiError.badRequest("Your comment is profane"));

            const comment = await add(authorId, imageId, text);
            res.json(comment);
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
    like = async (req, res, next) => {
        try {
            const { id: userId, commentId } = req.body
            if (!commentId) throw new Error(
                "You didn't specify which comment you want to like"
            );
            await like(userId, commentId);
            res.json({ message: "Liked" });
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        }
    };
    unLike = async (req, res, next) => {
        try {
            const { id: userId, commentId } = req.body
            if (!commentId) throw new Error(
                "You didn't specify which comment you want to remove like from"
            );
            await unLike(userId, commentId);
            res.json({ message: "Unliked" });
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        }
    };
    delete = async (req, res, next) => {
        try {
            const { id: ownId, commentId } = req.body;
            if (!commentId) throw new Error(
                "You didn't specify which comment you want to delete"
            );
            await deleteComment(ownId, commentId);
            res.json({ message: "Deleted" });
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        };
    };
};

module.exports = new commentController();