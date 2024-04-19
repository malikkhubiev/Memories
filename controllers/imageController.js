const ApiError = require("../error/ApiError");
const {
  hide,
  get,
  deleteImage,
  notInterested,
  upload,
  save,
  like,
  unLike,
  view,
  show,
  unSave,
} = require("../services/imageService");
const Filter = require("bad-words");
const filter = new Filter();

class imageController {
  upload = async (req, res, next) => {
    try {
      const { id: authorId, description, tags } = req.body;
      const { img } = req.files;

      if (filter.isProfane(description))
        throw new Error("Your description is profane");
      JSON.parse(tags).forEach((tag) => {
        if (filter.isProfane(tag.name))
          throw new Error("One of your tags or image is profane");
      });

      const image = await upload(authorId, description, JSON.parse(tags), img);
      res.json(image);
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  get = async (req, res, next) => {
    try {
      const { id: userId } = req.body;
      let { id: imageId } = req.params;
      imageId = +imageId.slice(1);

      if (!imageId)
        throw new Error("You didn't specify which image you want to get");

      const image = await get(userId, imageId);
      res.json(image);
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  save = async (req, res, next) => {
    try {
      const { id: userId, imageId } = req.body;

      if (!imageId)
        throw new Error("You didn't specify which image you want to save");

      await save(userId, imageId);
      res.json({ message: "image saved" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  unSave = async (req, res, next) => {
    try {
      const { id: userId, imageId } = req.body;

      if (!imageId)
        throw new Error("You didn't specify which image you want to unsave");

      await unSave(userId, imageId);
      res.json({ message: "image unsaved" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  hide = async (req, res, next) => {
    try {
      const { id: userId, imageId } = req.body;

      if (!imageId)
        throw new Error("You didn't specify which image you want to hide");

      await hide(imageId);
      res.json({ message: "image hiden" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  show = async (req, res, next) => {
    try {
      const { id: userId, imageId } = req.body;

      if (!imageId)
        throw new Error("You didn't specify which image you want to show");

      await show(imageId);
      res.json({ message: "image shown" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  view = async (req, res, next) => {
    try {
      const { id: userId, imagesIds } = req.body;

      if (!imagesIds.length) res.json({ message: "no images viewed" });

      await view(userId, imagesIds);
      res.json({ message: "images viewed" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  like = async (req, res, next) => {
    try {
      const { id: userId, imageId } = req.body;
      if (!userId) return next(ApiError.badRequest("No sender address"));

      if (!imageId)
        throw new Error("You didn't specify which image you want to like");

      await like(userId, imageId);
      res.json({ message: "image liked" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  unLike = async (req, res, next) => {
    try {
      const { id: userId, imageId } = req.body;
      if (!userId) return next(ApiError.badRequest("No sender address"));

      if (!imageId)
        throw new Error("You didn't specify which image you want to unlike");

      await unLike(userId, imageId);
      res.json({ message: "image unliked" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  notInterested = async (req, res, next) => {
    try {
      const { id: userId, imageId } = req.body;
      if (!userId) return next(ApiError.badRequest("No sender address"));

      if (!imageId)
        throw new Error(
          "You didn't specify which image isn't interesting for you",
        );

      const notInterestedImageId = await notInterested(userId, imageId);
      res.json({ notInterestedImageId });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  delete = async (req, res, next) => {
    try {
      const { id: userId, imageId } = req.body;

      if (!imageId)
        throw new Error("You didn't specify which image you want to delete");

      await deleteImage(userId, imageId);
      res.json({ message: "image has been successfully deleted" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
}

module.exports = new imageController();
