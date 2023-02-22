const Sequelize = require('sequelize');
const sequelize = new Sequelize('bwt-spirala', 'root', '', { host: '127.0.0.1', dialect: 'mysql', logging: false });
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.predmet = require('./models/Predmet')(sequelize);
db.student = require('./models/Student')(sequelize);
db.cas = require('./models/Cas')(sequelize);
db.prisustvo = require('./models/Prisustvo')(sequelize);

db.student.hasMany(db.prisustvo);
db.prisustvo.belongsTo(db.student);

db.cas.hasMany(db.prisustvo, { foreignKey: 'casId' });
db.prisustvo.belongsTo(db.cas, { foreignKey: 'casId' });

db.predmet.hasMany(db.cas);
db.cas.belongsTo(db.predmet);

db.studentPredmet = db.student.belongsToMany(db.predmet, {
    through: "student_predmet",
    as: "predmeti",
    foreignKey: "studentId",
    timestamps: false
});
db.predmet.belongsToMany(db.student, {
    through: "student_predmet",
    as: "studenti",
    foreignKey: "predmetId",
    timestamps: false
});

module.exports = db;
