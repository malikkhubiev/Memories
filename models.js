const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./db");

const id = {
  type: DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true,
  allowNull: false,
};
const popularity = { type: DataTypes.INTEGER, defaultValue: 0 };
const boolean = { type: Sequelize.BOOLEAN, defaultValue: false };
const email = { type: DataTypes.STRING, allowNull: false };

const User = sequelize.define("user", {
  id,
  email,
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  avatar: { type: DataTypes.STRING },
  popularity,
  isOpened: { type: DataTypes.BOOLEAN, defaultValue: true },
  isFirstTime: { type: DataTypes.BOOLEAN, defaultValue: true },
});

const VerificationCode = sequelize.define("verificationCode", {
  id,
  email,
  code: { type: DataTypes.INTEGER, allowNull: false },
});

const Image = sequelize.define("image", {
  id,
  description: { type: DataTypes.STRING },
  isPrivate: boolean,
  fileName: { type: DataTypes.STRING, allowNull: false },
  popularity,
});

const Tag = sequelize.define("tag", {
  id,
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  isPrivate: boolean,
});

const Comment = sequelize.define("comment", {
  id,
  text: { type: DataTypes.STRING, allowNull: false },
  isOwn: { type: DataTypes.BOOLEAN, allowNull: false }
});

const Chat = sequelize.define("chat", {
  id,
  firstChatterId: { type: DataTypes.INTEGER, allowNull: false },
  secondChatterId: { type: DataTypes.INTEGER, allowNull: false },
  visibleForFirstChatter: { type: DataTypes.BOOLEAN, defaultValue: true },
  visibleForSecondChatter: { type: DataTypes.BOOLEAN, defaultValue: true },
  lastMessageId: { type: DataTypes.INTEGER, defaultValue: null },
});

const Preference = sequelize.define("preference", {
  id,
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const SubscriptionRequest = sequelize.define("subscriptionRequest");
const UserFollowers = sequelize.define("userFollowers");
const UserBlocked = sequelize.define("userBlocked");
const ImageLike = sequelize.define("imageLike", { id });
const SavedImage = sequelize.define("savedImage", { id });
const NotInterestedImage = sequelize.define("notInterestedImage", { id });
const CommentLike = sequelize.define("commentLike", { id });

// unLinked or badLinked
const ImageView = sequelize.define("imageView", {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  imageId: { type: DataTypes.INTEGER, allowNull: false },
});
const ImageTag = sequelize.define("imageTag", {
  id,
  tagId: { type: DataTypes.INTEGER, allowNull: false },
});
const Message = sequelize.define("message", {
  id,
  idOfChat: { type: DataTypes.INTEGER, allowNull: false },
  from: { type: DataTypes.INTEGER, allowNull: false },
  to: { type: DataTypes.INTEGER, allowNull: false },
  visibleForFirstChatter: { type: DataTypes.BOOLEAN, defaultValue: true },
  visibleForSecondChatter: { type: DataTypes.BOOLEAN, defaultValue: true },
  text: { type: DataTypes.STRING, allowNull: false },
});
const UserChat = sequelize.define("userChat", {
  id,
  userId: { type: DataTypes.INTEGER, allowNull: false },
  chatId: { type: DataTypes.INTEGER, allowNull: false },
});
// unLinked or badLinked

User.hasMany(Image, {
  foreignKey: "authorId",
});
Image.belongsTo(User);

User.belongsToMany(Tag, {
  through: Preference,
  foreignKey: "userId",
  otherKey: "tagId",
});
Tag.belongsToMany(User, {
  through: Preference,
  foreignKey: "tagId",
  otherKey: "userId",
});

User.belongsToMany(User, {
  as: "SubscriptionRequest",
  through: SubscriptionRequest,
  foreignKey: "subscriberId",
  otherKey: "userId",
});
User.belongsToMany(User, { as: "Followers", through: UserFollowers });
User.belongsToMany(User, { as: "Blocked", through: UserBlocked });

User.belongsToMany(Image, { through: ImageLike });
Image.belongsToMany(User, { through: ImageLike });

User.belongsToMany(Image, { through: SavedImage });
Image.belongsToMany(User, { through: SavedImage });

User.belongsToMany(Image, { through: NotInterestedImage });
Image.belongsToMany(User, { through: NotInterestedImage });

User.hasMany(Comment, {
  foreignKey: "authorId",
});
Comment.belongsTo(User);

User.belongsToMany(Comment, { through: CommentLike });
Comment.belongsToMany(User, { through: CommentLike });

User.hasOne(VerificationCode);
VerificationCode.belongsTo(User);

Image.hasMany(ImageTag);
ImageTag.belongsTo(Image);

Image.hasMany(Comment);
Comment.belongsTo(Image);

module.exports = {
  User,
  UserChat,
  UserFollowers,
  UserBlocked,
  SubscriptionRequest,
  Preference,
  Tag,
  Image,
  ImageLike,
  ImageTag,
  ImageView,
  SavedImage,
  NotInterestedImage,
  Comment,
  CommentLike,
  Chat,
  Message,
  VerificationCode,
};
