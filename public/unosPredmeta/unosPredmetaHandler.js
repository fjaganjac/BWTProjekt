import AjaxPozivi from "../AjaxPozivi.js";

document.getElementById("dodaj").addEventListener('click', function () {
    const naziv = document.getElementById("naziv").value;
    const kod = document.getElementById("kod").value;
    console.log({ naziv: naziv, kod: kod });

    AjaxPozivi.posaljiPredmet({ naziv: naziv, kod: kod }, function (err, data) {
        if (err) {
            if (err.status == 400) {
                document.getElementById("poruka").style.color = "red";
            }
            if (err.status == 209) {
                document.getElementById("poruka").style.color = "#ff9100";
            }
            document.getElementById("poruka").innerHTML = JSON.parse(err.responseText).status;
        }
        else if (data) {
            document.getElementById("poruka").style.color = "green";
            document.getElementById("poruka").innerHTML = JSON.parse(data.responseText).status;
        }
    })
});
