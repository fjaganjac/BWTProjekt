const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const cas = sequelize.define("cas", {
        redniBroj: Sequelize.INTEGER,
        tip: Sequelize.STRING,
        sedmica: Sequelize.INTEGER,
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return cas;
};