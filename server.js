const fs = require('fs');
const http = require('http');
const url = require('url');
const Predmet = require('./scripts/predmet');

const server = http.createServer(function (req, res) {
    if (req.url == '/student' && req.method.toUpperCase() == 'POST') {
        let buffer = '';
        req.on('data', function (data) {
            buffer += data;
        });
        req.on('end', function () {
            const payload = JSON.parse(buffer);

            fs.readFile('./archives/studenti.csv', function (err, data) {
                if (err) throw err;

                if (data.includes(`,${payload.index}\n`)) {
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: `Student sa indexom ${payload.index} već postoji!` }));
                }
                else {
                    let novaLinija = `${payload.ime},${payload.prezime},${payload.index}\n`;
                    fs.appendFile('./archives/studenti.csv', novaLinija, function (err) {
                        if (err) throw err;
                        res.writeHead(201, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ status: "Kreiran student!" }));
                    });
                }
            });
        });
    }

    else if (req.url == '/predmet' && req.method.toUpperCase() == 'POST') {
        let buffer = '';
        req.on('data', function (data) {
            buffer += data;
        });
        req.on('end', function () {
            const payload = JSON.parse(buffer);

            fs.readFile('./archives/predmeti.csv', function (err, data) {
                if (err) throw err;

                if (data.includes(`,${payload.kod}`)) {
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: `Predmet sa kodom ${payload.kod} vec postoji` }));
                }
                else {
                    var predmet = new Predmet();
                    if (!predmet.provjeriKodPredmeta(payload.kod)) {
                        res.writeHead(201, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ status: `Kod predmeta nije ispravan` }));
                    }
                    else {
                        let novaLinija = `${payload.naziv},${payload.kod}\n`;
                        fs.appendFile('./archives/predmeti.csv', novaLinija, function (err) {
                            if (err) throw err;
                            res.writeHead(201, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ status: "Kreiran predmet!" }));
                        });
                    }
                }
            });
        });
    }

    else if (req.url == '/prisustvo' && req.method.toUpperCase() == 'POST') {
        let buffer = '';
        req.on('data', function (data) {
            buffer += data;
        });
        req.on('end', function () {
            const payload = JSON.parse(buffer);

            if (!["prisutan", "odsutan", "nijeUneseno"].includes(payload.statusPrisustva)) {
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: `Status prisustva nije ispravan!` }));
            }
            else {
                {
                    fs.readFile('./archives/predmeti.csv', function (err, data) {
                        if (err) throw err;

                        if (!data.includes(`,${payload.kodPredmeta}`)) {
                            res.writeHead(201, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ status: `Kod predmeta ne postoji!` }));
                        }
                    })
                }
                {
                    fs.readFile('./archives/studenti.csv', function (err, data) {
                        if (err) throw err;

                        if (!data.includes(`,${payload.indexStudenta}\n`)) {
                            res.writeHead(201, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ status: `Student ne postoji!` }));
                        }
                    })
                }
                {
                    fs.readFile('./archives/prisustva.csv', function (err, data) {
                        if (err) throw err;
                        var noviUpis = []
                        if (data.includes(`${payload.tipCasa},${payload.redniBrojCasa},${payload.sedmica},${payload.kodPredmeta},${payload.indexStudenta},`)) {
                            for (var red of data.toString().split('\n')) {
                                red = (red.includes(`${payload.tipCasa},${payload.redniBrojCasa},${payload.sedmica},${payload.kodPredmeta},${payload.indexStudenta},`)) ? red.replace(/odsutan(?!,)|prisutan(?!,)|nijeUneseno(?!,)/gm, payload.statusPrisustva) : red
                                noviUpis.push(red)
                            }
                            Upis = '';
                            for (let red in noviUpis) { Upis += noviUpis[red] + ((red == noviUpis.length - 1) ? '' : '\n'); }
                            fs.writeFile('./archives/prisustva.csv', Upis, (err) => {
                                if (err) throw err;
                            })
                            res.writeHead(201, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ status: `Izmjena napravljena!` }));
                        }
                        else {
                            fs.appendFile('./archives/prisustva.csv', `${payload.tipCasa},${payload.redniBrojCasa},${payload.sedmica},${payload.kodPredmeta},${payload.indexStudenta},${payload.statusPrisustva}\n`, function (err) {
                                if (err) throw err;
                                res.writeHead(201, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ status: "Kreirano prisustvo!" }));
                            });
                        }
                    })
                }
            }
        });
    }

    else if (req.url.includes('/prisustvo') && req.method.toUpperCase() == 'GET') {
        let buffer = '';
        req.on('data', function (data) {
            buffer += data;
        });
        req.on('end', function () {
            const params = url.parse(req.url, true).query
            var rprisutan = rodsutan = rnijeUneseno = 0;
            fs.readFile('./archives/prisustva.csv', function (err, data) {
                if (err) throw err;
                for (var red of data.toString().split('\n')) {
                    var podaciURedu = red.split(',')
                    if (podaciURedu[2] == params.sedmica && podaciURedu[3] == params.kodPredmeta && podaciURedu[4] == params.indexStudenta) {
                        if (podaciURedu[5].toString().includes("prisutan")) rprisutan++
                        if (podaciURedu[5].toString().includes("odsutan")) rodsutan++
                        if (podaciURedu[5].includes("nijeUneseno")) rnijeUneseno++
                    }
                }
                if (!rprisutan && !rodsutan && !rnijeUneseno) {
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: "Prisustvo ne postoji!" }));
                }
                else {
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ prisustvoZaSedmicu: params.sedmica, prisutan: rprisutan, odsutan: rodsutan, nijeUneseno: rnijeUneseno }));
                }
            })
        });
    }
}).listen(8080);
console.log("slusam port 8080");