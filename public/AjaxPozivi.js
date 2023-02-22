function posaljiStudent(studentObjekat, callback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            callback(null, ajax);
        }
        else if (ajax.readyState == 4) {
            callback(ajax, null);
        }
        ajax.open("POST", "http://localhost:8080/student", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(studentObjekat));
    }
}

function posaljiPredmet(predmetObjekat, callback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            callback(null, ajax);
        }
        if (ajax.readyState == 4) {
            callback(ajax, null);
        }
    };
    ajax.open("POST", "http://localhost:8080/predmet", true);
    ajax.setRequestHeader('Content-Type', "application/json");
    ajax.send(JSON.stringify(predmetObjekat));
}


function posaljiPrisustvo(prisustvoObjekat, callback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            callback(null, ajax);
        }
        else if (ajax.readyState == 4) {
            callback(ajax, null);
        }

        ajax.open("POST", "http://localhost:8080/prisustvo", true);
        ajax.setRequestHeader('Content-Type', "application/json");
        ajax.send(JSON.stringify(prisustvoObjekat));
    }
}

function dajPrisustvo(kodPredmeta, indexStudenta, sedmica, callback) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            callback(null, ajax);
        }
        else if (ajax.readyState == 4) {
            callback(ajax, null);
        }
    }
    ajax.open("GET", `http://localhost:8080/prisustvo?kodPredmeta=${kodPredmeta}&indexStudenta=${indexStudenta}&sedmica=${sedmica}`, true);
    ajax.send();
}

export default { posaljiStudent, posaljiPredmet, posaljiPrisustvo, dajPrisustvo };