const {
  User,
  VerificationCode,
  Image,
  ImageTag,
  Comment,
} = require("../models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const path = require("path");
const Filter = require("bad-words");
const { Sequelize } = require("../db");
const filter = new Filter();

const returnTokenPayload = (user) => {
  return {
    id: user.id,
    email: user.email,
  };
};

class authService {
  getIsAuth = async (userId) => {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new Error("There is no such user");
    return {
      id: userId,
      name: user.name,
      avatar: user.avatar,
      isAccountOpened: user.isAccountOpened,
      payload: returnTokenPayload(user),
    };
  };
  signin = async (email, name, password) => {
    const user = await User.findOne({ where: {
      email,
      [Sequelize.Op.and]: [
        {
          name: {
            [Sequelize.Op.like]: `${name}%`
          }
        },
        {
          name: {
            [Sequelize.Op.and]: [
              Sequelize.where(Sequelize.fn('length', Sequelize.col('name')), name.length + 42)
            ]
          }
        }
      ]
    } });
    if (!user) throw new Error("Wrong username or password");
    const isPassword = bcrypt.compareSync(password, user.password);
    if (!isPassword) throw new Error("Wrong username or password");
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      isAccountOpened: user.isAccountOpened,
      payload: returnTokenPayload(user),
    };
  };
  signup = async (email, password, name) => {
    let clearedName = name.slice(0, -42);
    const mayBeExistingUser = await User.findOne({where: {
      email: "1@mail.ru",
      [Sequelize.Op.and]: [
        {
          name: {
            [Sequelize.Op.like]: `${clearedName}%`
          }
        },
        {
          name: {
            [Sequelize.Op.and]: [
              Sequelize.where(Sequelize.fn('length', Sequelize.col('name')), clearedName.length + 42)
            ]
          }
        }
      ]
    }})
    if (mayBeExistingUser) throw new Error("User with the same name is existing");
    if (filter.isProfane(name)) throw new Error("Your name is profane");
    const hashedPassword = bcrypt.hashSync(password, 3);
    
    await User.create({ email, password: hashedPassword, name });
  };
  checkingEmail = async (email, process) => {
    const candidate = await User.findOne({ where: { email } });
    if (candidate && process === "sign up")
      throw new Error("User with the same email is already existing");
    if (!candidate && process === "forgot password")
      throw new Error("There is no such user");
  };
  saveVerificationCode = async (email, code) => {
    const mayBeExistingCode = await VerificationCode.findOne({
      where: { email },
    });
    if (mayBeExistingCode)
      return await VerificationCode.update({ code }, { where: { email } });
    await VerificationCode.create({ email, code });
  };
  compareCode = async (email, code) => {
    code = Number(code);
    const realCode = await VerificationCode.findOne({ where: { email } });
    if (realCode.code !== code) throw new Error("Wrong code, try again");
    else await VerificationCode.destroy({ where: { email } });
  };
  changePassword = async (email, password) => {
    const hashedPassword = bcrypt.hashSync(password, 3);
    await User.update({ password: hashedPassword }, { where: { email } });
  };
  changeNameAvatarIsOpened = async (id, name, avatar, isOpened) => {
    const response = {};
    if (avatar) {
      const user = await User.findOne({where: {id}})
      if (user.name.includes("-user-") && user.name.length > 42) {
        throw new Error("You're not allowed to change avatar or name");
      }
      const fileName = uuid.v4() + ".jpg";
      avatar.mv(path.resolve(__dirname, "..", "static", fileName));
      await User.update({ avatar: fileName }, { where: { id } });
      response.avatar = fileName;
    }
    if (name) { 
      if (name.includes("-user-") && name.length > 42) {
        throw new Error("You're not allowed to change avatar or name");
      }
      await User.update({ name }, { where: { id } });
      response.name = name;
    }
    if (isOpened) {
      await User.update({ isOpened }, { where: { id } });
      response.isOpened = isOpened;
    }
    return response;
  };
  deleteAccount = async (id, password) => {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("There is no such user");
    const isPassword = bcrypt.compareSync(password, user.password);
    if (!isPassword) throw new Error("You entered the wrong password");

    const images = await Image.findAll({
      where: {
        authorId: id,
      },
    });
    const imagesIds = [];
    images.forEach((image) => {
      imagesIds.push(image.dataValues.id);
    });
    await ImageTag.destroy({
      where: {
        imageId: {
          [Sequelize.Op.in]: imagesIds,
        },
      },
    });
    await Comment.destroy({
      where: {
        imageId: {
          [Sequelize.Op.in]: imagesIds,
        },
      },
    });
    await Image.destroy({
      where: {
        authorId: id,
      },
    });
    await User.destroy({ where: { id } });
  };
}

module.exports = new authService();
