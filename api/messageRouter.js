const { Router } = require("express");
const messageController = require("../controllers/messageController");

const messageRouter = new Router();

messageRouter.post("/send", messageController.send);
messageRouter.delete("/delete", messageController.delete);

module.exports = messageRouter; // rtk