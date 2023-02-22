const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const prisustvo = sequelize.define("prisustvo", {
        status: Sequelize.STRING
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return prisustvo;
};