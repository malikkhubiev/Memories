const { Sequelize } = require("sequelize");

/*module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: "postgres"
    }
);*/

module.exports = new Sequelize({
  dialect: "sqlite",
  storage: "./surata.sqlite",
});
