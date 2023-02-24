import AjaxPozivi from "../AjaxPozivi.js";

document.getElementById("prikazi").addEventListener('click', function () {
    const kodPredmeta = document.getElementById("kodPredmeta").value;
    const indexStudenta = document.getElementById("indexStudenta").value;
    const sedmica = document.getElementById("sedmica").value;
    console.log(kodPredmeta + " " + indexStudenta + " " + sedmica);

    AjaxPozivi.dajPrisustvo(kodPredmeta, indexStudenta, sedmica, function (err, data) {
        if (err) {
            document.getElementById("tabela").hidden = true;
            document.getElementById("poruka").style.color = "red";
            document.getElementById("poruka").innerHTML = JSON.parse(err.responseText).status;
        }
        else if (data) {
            document.getElementById("poruka").innerHTML = "";
            document.getElementById("tabela").hidden = false;
            document.getElementById("prisustvoZaSedmicu").innerHTML = JSON.parse(data.responseText).prisustvoZaSedmicu;
            document.getElementById("prisutan").innerHTML = JSON.parse(data.responseText).prisutan;
            document.getElementById("odsutan").innerHTML = JSON.parse(data.responseText).odsutan;
            document.getElementById("nijeUneseno").innerHTML = JSON.parse(data.responseText).nijeUneseno;
        }
    })
});
