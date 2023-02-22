const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const predmet = sequelize.define("predmet", {
        naziv: Sequelize.STRING,
        kod: Sequelize.STRING,
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return predmet;
};