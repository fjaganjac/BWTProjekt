const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const student = sequelize.define("student", {
        ime: Sequelize.STRING,
        prezime: Sequelize.STRING,
        index: Sequelize.STRING
    }, {
        timestamps: false,
        freezeTableName: true
    })
    return student;
};