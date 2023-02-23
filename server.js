const express = require('express');
const parser = require('body-parser');
const app = express();
const Predmet = require('./scripts/predmet');
const db = require('./db');

app.use(express.static('public'));
app.use(express.static('public/prisustvo'));
app.use(express.static('public/unosPredmeta'));
app.use(parser.json());

app.post('/student', async (req, res) => {
    const payload = req.body;
    await db.student.findOne({
        where: {
            index: payload.index
        }
    }).catch(err => {
        console.log("error -> db.student.findOne: " + err);
    }).then(studentPostoji => {
        if (studentPostoji) {
            res.status(209).send({ status: `Student sa indexom ${payload.index} već postoji` });
        }
        else {
            db.student.create({
                ime: payload.ime,
                prezime: payload.prezime,
                index: payload.index
            });
            res.status(200).send({ status: "Kreiran student!" });
        }
    }).catch(err => {
        console.log("error -> db.student.create: " + err);
    });
});

app.post('/predmet', async (req, res) => {
    const payload = req.body;
    var predmet = new Predmet();
    if (!predmet.provjeriKodPredmeta(payload.kod)) {
        res.status(400).json({ status: "Kod predmeta nije ispravan" });
    }
    else {
        await db.predmet.findOne({
            where: {
                kod: payload.kod
            }
        }).catch(err => {
            console.log("error -> db.predmet.findOne: " + err);
        }).then(predmetPostoji => {
            if (predmetPostoji) {
                res.status(209).json({ status: `Predmet sa kodom ${payload.kod} već postoji` });
            }
            else {
                db.predmet.create({
                    naziv: payload.naziv,
                    kod: payload.kod
                });
                res.status(200).json({ status: "Kreiran predmet!" });
            }
        }).catch(err => {
            console.log("error -> db.predmet.create: " + err);
        });
    }
});

app.post('/prisustvo', async (req, res) => {
    const payload = req.body;
    if (!["prisutan", "odsutan", "nijeUneseno"].includes(payload.statusPrisustva)) {
        res.status(400).send({ status: "Status prisustva nije ispravan" });
    }
    else {
        var daLiImaPredmet = await db.predmet.findOne({
            where: {
                kod: payload.kodPredmeta
            }
        });
        if (!daLiImaPredmet) {
            res.status(400).send({ status: "Kod predmeta ne postoji!" });
        }
        else {
            var daLiImaStudent = await db.student.findOne({
                where: {
                    index: payload.indexStudenta
                }
            });
            if (!daLiImaStudent) {
                res.status(400).send({ status: "Student ne postoji!" });
            }
            else {
                await db.prisustvo.findOne({
                    where: {
                        '$ca.tip$': payload.tipCasa,
                        '$ca.redniBroj$': payload.redniBrojCasa,
                        '$ca.sedmica$': payload.sedmica,
                        '$student.index$': payload.indexStudenta
                    },
                    include: [{
                        model: db.cas,
                        as: "ca",
                        include: [{
                            model: db.predmet,
                            where: {
                                kod: payload.kodPredmeta
                            }
                        }]
                    },
                    {
                        model: db.student
                    }]
                }
                ).then(prisustvo => {
                    if (prisustvo) {
                        prisustvo.status = payload.statusPrisustva;
                        prisustvo.save();
                        res.status(200).send({ status: "Azurirano prisustvo!" });
                    }
                    else {
                        var pPred, pStud;
                        return db.predmet.findOne({
                            where: {
                                kod: payload.kodPredmeta
                            }
                        }).then(predmet => {
                            pPred = predmet;
                            return db.student.findOne({
                                where: {
                                    index: payload.indexStudenta
                                }
                            });
                        }).then(student => {
                            pStud = student;
                            student.addPredmeti(pPred, { through: db.studentPredmet });
                            return db.cas.create({
                                redniBroj: payload.redniBrojCasa,
                                tip: payload.tipCasa,
                                sedmica: payload.sedmica,
                                predmetId: pPred.id
                            });
                        }).then(noviCas => {
                            db.prisustvo.create({
                                status: payload.statusPrisustva,
                                studentId: pStud.id,
                                casId: noviCas.id
                            });
                            res.status(200).send({ status: "Kreirano prisustvo!" });
                        });
                    }
                });
            }
        }
    }
});

app.get('/prisustvo', async (req, res) => {
    const params = req.query;
    var filterStatusPrisustva = (statusP) => {
        return {
            where: {
                '$ca.sedmica$': params.sedmica,
                '$student.index$': params.indexStudenta,
                status: statusP
            },
            include: [{
                model: db.cas,
                as: "ca",
                include: [{
                    model: db.predmet,
                    where: {
                        kod: params.kodPredmeta
                    }
                }]
            },
            {
                model: db.student,
            }]
        };
    };
    var prisutan, odsutan, nijeUneseno;
    prisutan = await db.prisustvo.count(filterStatusPrisustva("prisutan")).then(
        odsutan = await db.prisustvo.count(filterStatusPrisustva("odsutan")).then(
            nijeUneseno = await db.prisustvo.count(filterStatusPrisustva("nijeUneseno")).catch(err => {
                console.log("error -> nijeUneseno: " + err);
            })
        ).catch(err => {
            console.log("error -> odsutan: " + err)
        })).catch(err => {
            console.log("error -> prisutan: " + err);
        });
    if (!prisutan && !odsutan && !nijeUneseno) {
        res.status(400).send({ status: "Prisustvo ne postoji!" });
    }
    else {
        res.status(200).send({ prisustvoZaSedmicu: params.sedmica, prisutan: prisutan, odsutan: odsutan, nijeUneseno: nijeUneseno });
    }
});

app.listen(8080, () => {
    db.sequelize.sync({
        force: true
    });
});
console.log("listening to port 8080");