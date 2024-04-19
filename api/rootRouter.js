const { Router } = require("express");
const chatRouter = require("./chatRouter");
const commentRouter = require("./commentRouter");
const imageRouter = require("./imageRouter");
const messageRouter = require("./messageRouter");
const tagRouter = require("./tagRouter");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const checkIsAuthMiddleware = require("../middleware/checkIsAuthMiddleware");
const searchRouter = require("./searchRouter");

const router = new Router();

router.use("/auth", authRouter);
router.use("/user", checkIsAuthMiddleware, userRouter);
router.use("/image", checkIsAuthMiddleware, imageRouter);
router.use("/tag", checkIsAuthMiddleware, tagRouter);
router.use("/comment", checkIsAuthMiddleware, commentRouter);
router.use("/chat", checkIsAuthMiddleware, chatRouter);
router.use("/message", checkIsAuthMiddleware, messageRouter);
router.use("/search", checkIsAuthMiddleware, searchRouter);

module.exports = router;
