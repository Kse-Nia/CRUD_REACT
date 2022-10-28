const Sequelize = require("sequelize");

const sequelize = new Sequelize("CRUD", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
