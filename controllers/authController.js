const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { v4 } = require("uuid")

const {
  signup,
  deleteAccount,
  signin,
  changePassword,
  saveVerificationCode,
  checkingEmail,
  getIsAuth,
  changeIsOpened,
  compareCode,
  changeNameAvatarIsOpened,
} = require("../services/authService");
const sendEmail = require("../emailStuff/emailService");

const SECRET_KEY = process.env.SECRET_KEY;

const generateJwt = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
};

const encryptEmail = (email) => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: "24h" });
};

class authController {
  getIsAuth = async (req, res, next) => {
    try {
      const { id: userId } = req.body;
      const { id, name, avatar, isAccountOpened, payload } =
        await getIsAuth(userId);
      const token = generateJwt(payload);
      res.json({ id, name, avatar, isAccountOpened, token });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  signin = async (req, res, next) => {
    try {
      const { email, name: inputName, password } = req.body;
      if (!email) throw new Error("You didn't provide an email");
      if (!inputName) throw new Error("You didn't provide a name");
      if (!password) throw new Error("You didn't provide a password");
      const { id, name, avatar, isAccountOpened, payload } = await signin(
        email,
        inputName,
        password,
      );
      const token = generateJwt(payload);
      res.json({ id, name, avatar, isAccountOpened, token });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  speedSignUp = async (req, res, next) => {
    try {
      const { cos } = req.body;
      const encryptedEmail = encryptEmail("1@mail.ru");
      const name = "-user-"+v4()
      res.json({ encryptedEmail, name });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  signup = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let errorsString = "";
        errors.array().forEach((error) => {
          errorsString += `${error.param} `;
        });
        let errorMessage;
        if (errors.array().length === 1)
          errorMessage = errorsString + "parameter is invalid";
        else errorMessage = errorsString + "parameters are invalid";
        throw new Error(errorMessage);
      }

      const { email, password, name } = req.body;
      await signup(email, password, name);
      return res.json({ message: "You have successfully registered" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  checkingEmail = async (req, res, next) => {
    try {
      const { email, process } = req.body;
      if (!email) throw new Error("You didn't provide an email");
      if (!process)
        throw new Error(
          "You didn't provide what do you want: to sign up / to changePassword",
        );
      await checkingEmail(email, process);
      const code = await sendEmail(email);
      await saveVerificationCode(email, code);
      res.json({
        message:
          "A message has been sent to your mail, read the letter and confirm",
      });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  compareCode = async (req, res, next) => {
    try {
      const { email, code } = req.body;
      if (!email) throw new Error("You didn't provide an email");
      if (!code) throw new Error("You didn't provide a code");
      await compareCode(email, code);
      const encryptedEmail = encryptEmail(email);
      res.json({ encryptedEmail });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  changePassword = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let errorsString = "";
        errors.array().forEach((error) => {
          errorsString += `${error.param} `;
        });
        let errorMessage;
        if (errors.array().length === 1)
          errorMessage = errorsString + "parameter is invalid";
        else errorMessage = errorsString + "parameters are invalid";
        throw new Error(errorMessage);
      }

      const { email, password } = req.body;
      await changePassword(email, password);
      res.json({ message: "Password has been successfully changed" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  changeNameAvatarIsOpened = async (req, res, next) => {
    try {
      let { id, name, isOpened } = req.body;
      let avatar = null;
      if (req.files && req.files.avatar) {
        avatar = req.files.avatar;
      }

      if (!name && !avatar && !isOpened)
        res.json({message: "ok"})

      const response = await changeNameAvatarIsOpened(
        id,
        name,
        avatar,
        isOpened,
      );
      res.json(response);
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
  deleteAccount = async (req, res, next) => {
    try {
      const { id, password } = req.body;
      if (!password) throw new Error("You didn't provide a password");
      await deleteAccount(id, password);
      res.json({ message: "Your account successfully deleted" });
    } catch (e) {
      next(ApiError.badRequest(e.message || "Something went wrong"));
    }
  };
}

module.exports = new authController();
