const { Router } = require("express");
const imageController = require("../controllers/imageController");

const imageRouter = new Router();

imageRouter.post("/upload", imageController.upload);
imageRouter.get("/get:id", imageController.get);
imageRouter.put("/save", imageController.save);
imageRouter.put("/unSave", imageController.unSave);
imageRouter.put("/hide", imageController.hide);
imageRouter.put("/show", imageController.show);
imageRouter.post("/view", imageController.view);
imageRouter.put("/like", imageController.like);
imageRouter.put("/unLike", imageController.unLike);
imageRouter.post("/notInterested", imageController.notInterested);
imageRouter.delete("/delete", imageController.delete);

module.exports = imageRouter;