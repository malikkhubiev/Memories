const { Router } = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const checkIsAuthMiddleware = require("../middleware/checkIsAuthMiddleware");
const emailEncryptingMiddleware = require("../middleware/emailEncryptingMiddleware");

const authRouter = new Router();

const authValidationArray = [
  check("email").isEmail(),
  check("password").isLength({ min: 8 }),
  check("name").isLength({ min: 1, max: 150 }),
];

authRouter.get("/getIsAuth", checkIsAuthMiddleware, authController.getIsAuth);
authRouter.post("/signin", authController.signin);
authRouter.post("/speedSignUp", authController.speedSignUp);
authRouter.post(
  "/signup",
  emailEncryptingMiddleware,
  authValidationArray,
  authController.signup,
);
authRouter.post(
  "/checkingEmail",
  [check("email").isEmail()],
  authController.checkingEmail,
);
authRouter.post("/compareCode", authController.compareCode);
authRouter.put(
  "/changePassword",
  emailEncryptingMiddleware,
  authValidationArray.slice(0, 2),
  authController.changePassword,
);
authRouter.put(
  "/changeNameAvatarIsOpened",
  checkIsAuthMiddleware,
  authController.changeNameAvatarIsOpened,
);
authRouter.delete(
  "/deleteAccount",
  checkIsAuthMiddleware,
  authController.deleteAccount,
);

module.exports = authRouter;
