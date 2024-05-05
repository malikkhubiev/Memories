const ApiError = require("../error/ApiError");
const {
  follow,
  block,
  unBlock,
  getUserProfile,
  getOwnAndFollowingImages,
  getPreferences,
  getImages,
  setPreferences,
  unFollow,
  getImagesByPreferences,
  sendASubscriptionRequest,
  getRequests,
  confirmSubRequest,
  denySubRequest,
} = require("../services/userService");

class userController {
  getPreferences = async (req, res, next) => {
    try {
      const { id: userId } = req.body;
      const preferences = await getPreferences(userId);
      res.json(preferences);
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  setPreferences = async (req, res, next) => {
    try {
      let { id: userId, preferences, isFirstTime } = req.body;
      if (!preferences) throw new Error("You didn't provide the preferences");
      if (!isFirstTime) isFirstTime = false;
      await setPreferences(preferences, userId, isFirstTime);
      res.json({ message: "Preferences are set" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  getImagesByPreferences = async (req, res, next) => {
    try {
      const { id } = req.body;
      const images = await getImagesByPreferences(id);
      res.json(images);
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  getOwnAndFollowingImages = async (req, res, next) => {
    try {
      const { id } = req.body;
      const images = await getOwnAndFollowingImages(id);
      res.json(images);
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  getImages = async (req, res, next) => {
    try {
      let { id: ownId, userId, imagesType, typeOfSorting } = req.body;
      if (!userId) userId = ownId;
      if (!imagesType) imagesType = "ordinary";
      if (!typeOfSorting) typeOfSorting = "date";
      const images = await getImages(ownId, userId, imagesType, typeOfSorting);
      res.json(images);
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  getUserProfile = async (req, res, next) => {
    try {
      let { id: ownId } = req.body;
      let userId = +req.params.userId.slice(1);
      if (!userId) userId = ownId;
      const profile = await getUserProfile(ownId, userId);
      res.json(profile);
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  sendASubscriptionRequest = async (req, res, next) => {
    try {
      const { id: senderId, userId } = req.body;
      if (!userId)
        throw new Error("You didn't provide the user you want to follow");
      await sendASubscriptionRequest(senderId, userId);
      res.json({ message: "You sended request" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  confirmSubRequest = async (req, res, next) => {
    try {
      const { id: confirmerId, userId } = req.body;
      if (!confirmerId) next(ApiError.badRequest("No confirmer id"));
      if (!userId)
        throw new Error("You didn't provide the user you want to confirm");
      await confirmSubRequest(confirmerId, userId);
      res.json({ message: "You confirmed request" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  denySubRequest = async (req, res, next) => {
    try {
      const { id: denier, userId } = req.body;
      if (!denier) next(ApiError.badRequest("No confirmer id"));
      if (!userId)
        throw new Error("You didn't provide the user you want to deny");
      await denySubRequest(denier, userId);
      res.json({ message: "You confirmed request" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  getRequests = async (req, res, next) => {
    try {
      const { id } = req.body;
      const results = await getRequests(id);
      res.json(results);
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  follow = async (req, res, next) => {
    try {
      const { id: followerId, followingId } = req.body;
      if (!followerId) next(ApiError.badRequest("No follower id"));
      if (!followingId)
        throw new Error("You didn't provide the user you want to follow");
      await follow(followerId, followingId);
      res.json({ message: "You followed" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  unFollow = async (req, res, next) => {
    try {
      const { id: followerId, unFollowingId } = req.body;
      if (!unFollowingId) next(ApiError.badRequest("No unFollowing id"));
      if (!followerId)
        throw new Error("You didn't provide the user you want to unfollow");
      await unFollow(followerId, unFollowingId);
      res.json({ message: "You unFollowed" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  block = async (req, res, next) => {
    try {
      const { id: blockerId, blockingId } = req.body;
      if (!blockerId) next(ApiError.badRequest("No bloker id"));
      if (!blockingId)
        throw new Error("You didn't provide the user you want to block");
      await block(blockerId, blockingId);
      res.json(200);
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  unBlock = async (req, res, next) => {
    try {
      const { id: blockerId, unBlockingId } = req.body;
      if (!blockerId) next(ApiError.badRequest("No bloker id"));
      if (!unBlockingId)
        throw new Error("You didn't provide the user you want to unblock");
      await unBlock(blockerId, unBlockingId);
      res.json(200);
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
}

module.exports = new userController();
