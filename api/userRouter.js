const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = new Router();

userRouter.get("/getPreferences", userController.getPreferences);
userRouter.post("/setPreferences", userController.setPreferences);

userRouter.get("/getImagesByPreferences", userController.getImagesByPreferences);
userRouter.get("/getOwnAndFollowingImages", userController.getOwnAndFollowingImages);
userRouter.post("/getImages", userController.getImages); 

userRouter.get("/getUserProfile:userId", userController.getUserProfile); 

userRouter.post("/sendASubscriptionRequest", userController.sendASubscriptionRequest);
userRouter.post("/confirmSubRequest", userController.confirmSubRequest);
userRouter.post("/denySubRequest", userController.denySubRequest);
userRouter.get("/getRequests", userController.getRequests);

userRouter.post("/follow", userController.follow);
userRouter.post("/unFollow", userController.unFollow);

userRouter.post("/block", userController.block);
userRouter.post("/unBlock", userController.unBlock);

module.exports = userRouter;