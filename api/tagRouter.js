const { Router } = require("express");
const tagController = require("../controllers/tagController");

const tagRouter = new Router();

tagRouter.get("/getImagesByTag/:tagId/:sortBy", tagController.getImagesByTag);
tagRouter.get("/findTags/:substring", tagController.findTags);

module.exports = tagRouter;
