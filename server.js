const fs = require('fs');
const http = require('http');

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
}).listen(8080);
console.log("slusam port 8080");