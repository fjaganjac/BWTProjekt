class Predmet {
    
    constructor() {
        this.kodPredmeta = "";     
    }

    static daLiJeURasponu(n, donjaGr, gornjaGr) { return !(n % 1 || n < donjaGr || n > gornjaGr); }

    izracunajPrisustvo(sedmica, listaPrisustva) {
        
        if(!Prisustvo.daLiJeURasponu(sedmica, 1, 15))
            return {greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!"};

        if(sedmica > this.trenutnaSedmica)
            return {greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!"};
        
        var listaBezDuplikata = [...listaPrisustva];
        var sedmice = [];
        for(var i = listaBezDuplikata.length - 1; i >= 0; i--) {
            if(!sedmice.includes(listaBezDuplikata[i].prSedmica)) { sedmice.push(listaBezDuplikata[i].prSedmica); }
            else { listaBezDuplikata.splice(i,1); }     
        }

        if(!sedmice.includes(sedmica)) { return {prisustvoZaSedmicu: sedmica, prisutan: -1, odsutan: -1, nijeUneseno: -1}; }

        var neispravniUnosi = [];
        var ukupnoPrisutan = 0;
        var ukupnoOdsutan = 0;
        var neuneseno = 0;

        for(var x of listaBezDuplikata) {

            if(!x.hasOwnProperty('prSedmica') || !x.hasOwnProperty('prisutan') || !x.hasOwnProperty('odsutan') || !x.hasOwnProperty('nijeUneseno')) 
                return {greska: "Parametar listaPrisustva nema ispravne properties!"};

            if(x.prisutan + x.odsutan + x.nijeUneseno > 8)
                return {greska: "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!"};

            if(!Prisustvo.daLiJeURasponu(x.prSedmica, 1, 15)) { neispravniUnosi.push("prSedmica"); }
            if(!Prisustvo.daLiJeURasponu(x.prisutan, 0, 8)) { neispravniUnosi.push("prisutan"); }
            if(!Prisustvo.daLiJeURasponu(x.odsutan, 0, 8)) { neispravniUnosi.push("odsutan"); }
            if(!Prisustvo.daLiJeURasponu(x.nijeUneseno, 0, 8)) { neispravniUnosi.push("nijeUneseno"); }

            if(neispravniUnosi.length) { return { greska: `Parametar listaPrisustva nema ispravne vrijednosti za sedmicu ${x.prSedmica} za properties [${neispravniUnosi.toString()}]!`}; }

            ukupnoPrisutan += x.prisutan;
            ukupnoOdsutan += x.odsutan;

            if(x.nijeUneseno) { neuneseno++; }
        }

        this.prisustvo = Math.round(ukupnoPrisutan/(ukupnoPrisutan + ukupnoOdsutan) * 100) / 100;
        
        this.finalnoStanje = (!neuneseno) ? true : false;
        
        var result = listaBezDuplikata.filter(obj => {
            return obj.prSedmica == sedmica;
          })[0];
        return { prisustvoZaSedmicu: sedmica, prisutan: result.prisutan, odsutan: result.odsutan, nijeUneseno: result.nijeUneseno };
    }
}