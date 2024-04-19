const { Router } = require("express");
const searchController = require("../controllers/searchController");

const searchRouter = new Router();

searchRouter.get(
  "/getTagsBySubstring/:substring",
  searchController.getTagsBySubstring,
);
searchRouter.get(
  "/getUsersBySubstring/:substring",
  searchController.getUsersBySubstring,
);
searchRouter.get(
  "/getFollowersOrFollowingsBySubstr/:substring/:who",
  searchController.getFollowersOrFollowingsBySubstr,
);
searchRouter.get(
  "/getBlockedUsersBySubstr/:substring/",
  searchController.getBlockedUsersBySubstr,
);
searchRouter.get(
  "/getImageLikers/:id/:substring",
  searchController.getImageLikers,
);

module.exports = searchRouter;
