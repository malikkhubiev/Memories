const { Router } = require("express");
const commentController = require("../controllers/commentController");

const commentRouter = new Router();

commentRouter.post("/add", commentController.add);
commentRouter.put("/like", commentController.like);
commentRouter.put("/unLike", commentController.unLike);
commentRouter.delete("/delete", commentController.delete);

module.exports = commentRouter;
