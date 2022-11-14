class Predmet {
    
    constructor() {
        this.kodPredmeta = "";     
    }

    provjeriKodPredmeta(kod) {
        if(kod.split("-").length != 4 ||
           !["RI", "AE", "EE", "TK"].includes(kod.split("-")[0]) ||
           !["BoE", "MoE", "RS"].includes(kod.split("-")[1]) ||
           !["1", "2", "3"].includes(kod.split("-")[2]) ||
           !["1", "2"].includes(kod.split("-")[3]) ||
           (["MoE", "RS"].includes(kod.split("-")[1]) && !["1", "2"].includes(kod.split("-")[2]))) {
            return false;
        }
        this.kodPredmeta = kod;
        return true;
    }

}

module.exports = Predmet;